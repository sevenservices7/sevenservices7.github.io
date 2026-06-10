export interface LeadInput {
  name: string; email: string; phone: string;
  unit_slug?: string; language?: string; service_code?: string; message?: string; source?: string;
}
const TRANSPORT = Deno.env.get('KOMMO_TRANSPORT') || 'api';
function firstLast(full: string): { first: string; last: string } {
  const parts = (full || '').trim().split(/\s+/);
  return { first: parts[0] || '', last: parts.slice(1).join(' ') };
}
export async function createKommoLead(lead: LeadInput): Promise<{ ok: boolean; lead_id?: number }> {
  if (TRANSPORT === 'zapier') {
    const hook = Deno.env.get('ZAPIER_KOMMO_HOOK_URL');
    if (!hook) throw new Error('ZAPIER_KOMMO_HOOK_URL nao configurado');
    const r = await fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) });
    return { ok: r.ok };
  }
  const subdomain = Deno.env.get('KOMMO_SUBDOMAIN');
  const token = Deno.env.get('KOMMO_LONG_LIVED_TOKEN');
  if (!subdomain || !token) throw new Error('KOMMO_SUBDOMAIN/KOMMO_LONG_LIVED_TOKEN nao configurados');
  const pipelineId = Number(Deno.env.get('KOMMO_PIPELINE_ID') || 0) || undefined;
  const statusId = Number(Deno.env.get('KOMMO_STATUS_ID') || 0) || undefined;
  const fId = (k: string) => Number(Deno.env.get(k) || 0) || undefined;
  const { first, last } = firstLast(lead.name);
  const leadCFV: any[] = [];
  const pushCF = (idEnv: string, value?: string) => { const id = fId(idEnv); if (id && value) leadCFV.push({ field_id: id, values: [{ value }] }); };
  pushCF('KOMMO_FIELD_UNIT', lead.unit_slug);
  pushCF('KOMMO_FIELD_LANGUAGE', lead.language);
  pushCF('KOMMO_FIELD_SERVICE', lead.service_code);
  pushCF('KOMMO_FIELD_SOURCE', lead.source || 'website');
  const contactCFV: any[] = [];
  if (lead.phone) contactCFV.push({ field_code: 'PHONE', values: [{ enum_code: 'MOB', value: lead.phone }] });
  if (lead.email) contactCFV.push({ field_code: 'EMAIL', values: [{ enum_code: 'WORK', value: lead.email }] });
  const tags = [{ name: 'website' }, lead.unit_slug ? { name: `unidade:${lead.unit_slug}` } : null, lead.language ? { name: `idioma:${lead.language}` } : null].filter(Boolean);
  const body = [{
    name: `Atendimento Online — ${lead.name}`,
    ...(pipelineId ? { pipeline_id: pipelineId } : {}),
    ...(statusId ? { status_id: statusId } : {}),
    ...(leadCFV.length ? { custom_fields_values: leadCFV } : {}),
    _embedded: { contacts: [{ first_name: first, last_name: last, custom_fields_values: contactCFV }], tags },
  }];
  const res = await fetch(`https://${subdomain}.kommo.com/api/v4/leads/complex`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body) });
  if (!res.ok) { const txt = await res.text().catch(() => res.statusText); throw new Error(`Kommo error ${res.status}: ${txt}`); }
  const data = await res.json().catch(() => null);
  const lead_id = Array.isArray(data) ? data[0]?.id : data?._embedded?.leads?.[0]?.id;
  return { ok: true, lead_id };
}
