import { preflight, json } from '../_shared/cors.ts';
import { adminClient, stripeClient, checkoutUrls } from '../_shared/clients.ts';

Deno.serve(async (req) => {
  const pf = preflight(req);
  if (pf) return pf;
  const origin = req.headers.get('origin');
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, origin);
  try {
    const body = await req.json();
    const { mode, locale = 'pt' } = body;
    const sb = adminClient();
    const stripe = stripeClient();
    const urls = checkoutUrls(locale);
    let lineItems: any[] = [];
    let metadata: Record<string, string> = {};
    if (mode === 'cart') {
      const items: { service_code: string; quantity: number }[] = body.items || [];
      if (!items.length) return json({ error: 'empty_cart' }, 400, origin);
      const codes = items.map((i) => i.service_code);
      const { data: services, error } = await sb.from('services').select('code,name,price,status').in('code', codes).eq('status', 'active');
      if (error) throw error;
      const byCode = new Map((services || []).map((s: any) => [s.code, s]));
      let amountTotal = 0;
      const orderItems: any[] = [];
      for (const it of items) {
        const svc = byCode.get(it.service_code);
        if (!svc || svc.price == null) continue;
        const qty = Math.max(1, Math.min(20, Number(it.quantity) || 1));
        amountTotal += Number(svc.price) * qty;
        lineItems.push({ quantity: qty, price_data: { currency: 'eur', unit_amount: Math.round(Number(svc.price) * 100), product_data: { name: svc.name } } });
        orderItems.push({ service_code: svc.code, name_snapshot: svc.name, unit_price: svc.price, quantity: qty });
      }
      if (!lineItems.length) return json({ error: 'no_valid_items' }, 400, origin);
      const { data: order, error: oErr } = await sb.from('orders').insert({ status: 'pending', amount_total: amountTotal, locale, unit_slug: body.unit_slug || '', customer_name: body.customer?.name || '', customer_email: body.customer?.email || '', customer_phone: body.customer?.phone || '' }).select('id').single();
      if (oErr) throw oErr;
      await sb.from('order_items').insert(orderItems.map((oi) => ({ ...oi, order_id: order.id })));
      metadata = { order_id: order.id };
    } else if (mode === 'booking') {
      const { data: booking, error } = await sb.from('bookings').select('id,amount,service_code,language,slot_start').eq('id', body.booking_id).single();
      if (error || !booking) return json({ error: 'booking_not_found' }, 404, origin);
      lineItems = [{ quantity: 1, price_data: { currency: 'eur', unit_amount: Math.round(Number(booking.amount) * 100), product_data: { name: `Consultoria (${booking.language})` } } }];
      metadata = { booking_id: booking.id };
    } else {
      return json({ error: 'invalid_mode' }, 400, origin);
    }
    // Sem payment_method_types fixos: o Stripe mostra os métodos ativos no
    // Dashboard (cartão sempre; MB Way/Multibanco/Klarna quando ativados).
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      locale: locale as any,
      customer_email: body.customer?.email || undefined,
      success_url: `${urls.success}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: urls.cancel,
      metadata,
    });
    if (metadata.order_id) await sb.from('orders').update({ stripe_session_id: session.id }).eq('id', metadata.order_id);
    if (metadata.booking_id) await sb.from('bookings').update({ stripe_session_id: session.id }).eq('id', metadata.booking_id);
    return json({ url: session.url }, 200, origin);
  } catch (e) {
    console.error('create-checkout-session', e);
    return json({ error: 'internal_error' }, 500, origin);
  }
});
