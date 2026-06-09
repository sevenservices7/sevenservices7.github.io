// Carrinho client-side (localStorage). Usado pelas ilhas interativas.
export interface CartItem {
  service_code: string;
  name: string;
  price: number;
  quantity: number;
}

const KEY = 'seven_cart_v1';
const EVT = 'seven:cart';

function read(): CartItem[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

function write(items: CartItem[]): void {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVT, { detail: items }));
}

export function getCart(): CartItem[] {
  return read();
}

export function addItem(item: Omit<CartItem, 'quantity'>, qty = 1): void {
  const items = read();
  const existing = items.find((i) => i.service_code === item.service_code);
  if (existing) existing.quantity += qty;
  else items.push({ ...item, quantity: qty });
  write(items);
}

export function setQty(code: string, qty: number): void {
  let items = read();
  if (qty <= 0) items = items.filter((i) => i.service_code !== code);
  else items = items.map((i) => (i.service_code === code ? { ...i, quantity: qty } : i));
  write(items);
}

export function removeItem(code: string): void {
  write(read().filter((i) => i.service_code !== code));
}

export function clearCart(): void {
  write([]);
}

export function cartCount(): number {
  return read().reduce((n, i) => n + i.quantity, 0);
}

export function cartTotal(): number {
  return read().reduce((s, i) => s + i.price * i.quantity, 0);
}

/** Assina mudanças no carrinho. Retorna função para desinscrever. */
export function onCartChange(cb: (items: CartItem[]) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent).detail ?? read());
  window.addEventListener(EVT, handler);
  return () => window.removeEventListener(EVT, handler);
}
