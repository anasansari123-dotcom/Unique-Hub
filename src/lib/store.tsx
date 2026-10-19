"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { SITE } from "./config";
import { SEED_CUSTOMERS, SEED_PRODUCTS, buildSeedOrders } from "./data";
import type { Address, CartItem, Customer, Enquiry, Order, PaymentMethod, PaymentStatus, Product } from "./types";
import { uid } from "./utils";

/**
 * Client-side store backed by localStorage. It stands in for the MySQL database
 * so the website and the ERP admin share the same products, orders and customers.
 */

type Totals = { subtotal: number; shipping: number; tax: number; discount: number; total: number; count: number };

type StoreState = {
  ready: boolean;
  products: Product[];
  orders: Order[];
  customers: Customer[];
  enquiries: Enquiry[];
  cart: CartItem[];
  user: Customer | null;
  admin: boolean;
};

type Store = StoreState & {
  getProduct: (id: string) => Product | undefined;
  cartLines: { product: Product; qty: number }[];
  totals: Totals;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  saveProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  placeOrder: (args: { address: Address; method: PaymentMethod; paymentStatus: PaymentStatus; paymentRef?: string; note?: string }) => Order;
  createStoreBill: (args: { customer: Address; items: { productId: string; qty: number }[]; method: PaymentMethod; discount: number }) => Order;
  updateOrder: (id: string, patch: Partial<Order>) => void;
  loginCustomer: (data: { email: string; name?: string; phone?: string }) => Customer;
  logout: () => void;
  adminLogin: () => void;
  adminLogout: () => void;
  addEnquiry: (e: Omit<Enquiry, "id" | "createdAt" | "read">) => void;
  markEnquiryRead: (id: string) => void;
  resetDemo: () => void;
};

const KEYS = {
  products: "uh_products",
  orders: "uh_orders",
  customers: "uh_customers",
  enquiries: "uh_enquiries",
  cart: "uh_cart",
  user: "uh_user",
  admin: "uh_admin",
} as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked */
  }
}

export function computeTotals(lines: { price: number; qty: number }[], discount = 0): Totals {
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= SITE.freeShippingAbove ? 0 : SITE.shippingFee;
  const tax = Math.round(subtotal - subtotal / (1 + SITE.gstRate)); // prices are GST inclusive
  return { subtotal, shipping, tax, discount, total: Math.max(0, subtotal + shipping - discount), count: lines.reduce((s, l) => s + l.qty, 0) };
}

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>({
    ready: false,
    products: SEED_PRODUCTS,
    orders: [],
    customers: [],
    enquiries: [],
    cart: [],
    user: null,
    admin: false,
  });
  const loaded = useRef(false);

  useEffect(() => {
    const products = read<Product[]>(KEYS.products, SEED_PRODUCTS);
    const customers = read<Customer[]>(KEYS.customers, SEED_CUSTOMERS);
    const orders = read<Order[] | null>(KEYS.orders, null) ?? buildSeedOrders(products);
    setState({
      ready: true,
      products,
      customers,
      orders,
      enquiries: read<Enquiry[]>(KEYS.enquiries, []),
      cart: read<CartItem[]>(KEYS.cart, []),
      user: read<Customer | null>(KEYS.user, null),
      admin: read<boolean>(KEYS.admin, false),
    });
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    write(KEYS.products, state.products);
    write(KEYS.orders, state.orders);
    write(KEYS.customers, state.customers);
    write(KEYS.enquiries, state.enquiries);
    write(KEYS.cart, state.cart);
    write(KEYS.user, state.user);
    write(KEYS.admin, state.admin);
  }, [state]);

  const getProduct = useCallback((id: string) => state.products.find((p) => p.id === id), [state.products]);

  const cartLines = useMemo(
    () =>
      state.cart
        .map((c) => ({ product: state.products.find((p) => p.id === c.productId), qty: c.qty }))
        .filter((l): l is { product: Product; qty: number } => !!l.product),
    [state.cart, state.products],
  );
  const totals = useMemo(() => computeTotals(cartLines.map((l) => ({ price: l.product.price, qty: l.qty }))), [cartLines]);

  const nextOrderNo = (orders: Order[]) =>
    orders.reduce((m, o) => Math.max(m, parseInt(o.id.replace(/\D/g, ""), 10) || 0), 1000) + 1;

  const upsertCustomer = (customers: Customer[], a: { email: string; name?: string; phone?: string; city?: string }) => {
    const existing = customers.find((c) => c.email.toLowerCase() === a.email.toLowerCase());
    if (existing) {
      const merged = { ...existing, name: a.name || existing.name, phone: a.phone || existing.phone, city: a.city || existing.city, verified: true };
      return { customer: merged, customers: customers.map((c) => (c.id === existing.id ? merged : c)) };
    }
    const customer: Customer = {
      id: uid("C"),
      name: a.name || a.email.split("@")[0],
      email: a.email,
      phone: a.phone || "",
      city: a.city,
      verified: true,
      createdAt: new Date().toISOString(),
    };
    return { customer, customers: [customer, ...customers] };
  };

  const store: Store = {
    ...state,
    getProduct,
    cartLines,
    totals,

    addToCart: (id, qty = 1) =>
      setState((s) => {
        const found = s.cart.find((c) => c.productId === id);
        const cart = found
          ? s.cart.map((c) => (c.productId === id ? { ...c, qty: c.qty + qty } : c))
          : [...s.cart, { productId: id, qty }];
        return { ...s, cart };
      }),
    setQty: (id, qty) =>
      setState((s) => ({ ...s, cart: s.cart.map((c) => (c.productId === id ? { ...c, qty: Math.max(1, qty) } : c)) })),
    removeFromCart: (id) => setState((s) => ({ ...s, cart: s.cart.filter((c) => c.productId !== id) })),
    clearCart: () => setState((s) => ({ ...s, cart: [] })),

    saveProduct: (p) =>
      setState((s) => ({
        ...s,
        products: s.products.some((x) => x.id === p.id) ? s.products.map((x) => (x.id === p.id ? p : x)) : [p, ...s.products],
      })),
    deleteProduct: (id) => setState((s) => ({ ...s, products: s.products.filter((p) => p.id !== id) })),

    placeOrder: ({ address, method, paymentStatus, paymentRef, note }) => {
      const t = totals;
      const n = nextOrderNo(state.orders);
      const { customer, customers } = upsertCustomer(state.customers, { ...address, city: address.city });
      const order: Order = {
        id: `UH${n}`,
        invoiceNo: `INV/26-27/${String(n).padStart(5, "0")}`,
        customerId: state.user?.id ?? customer.id,
        customer: address,
        items: cartLines.map((l) => ({ productId: l.product.id, name: l.product.name, price: l.product.price, qty: l.qty, image: l.product.image })),
        subtotal: t.subtotal,
        shipping: t.shipping,
        tax: t.tax,
        discount: 0,
        total: t.total,
        paymentMethod: method,
        paymentStatus,
        paymentRef,
        status: "Pending",
        channel: "Online",
        note,
        createdAt: new Date().toISOString(),
      };
      setState((s) => ({
        ...s,
        customers,
        orders: [order, ...s.orders],
        cart: [],
        products: s.products.map((p) => {
          const line = order.items.find((i) => i.productId === p.id);
          return line ? { ...p, stock: Math.max(0, p.stock - line.qty) } : p;
        }),
      }));
      return order;
    },

    createStoreBill: ({ customer: addr, items, method, discount }) => {
      const n = nextOrderNo(state.orders);
      const lines = items
        .map((i) => ({ p: state.products.find((x) => x.id === i.productId), qty: i.qty }))
        .filter((x): x is { p: Product; qty: number } => !!x.p);
      const sub = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
      const { customer, customers } = addr.email
        ? upsertCustomer(state.customers, addr)
        : { customer: { id: "WALKIN" } as Customer, customers: state.customers };
      const order: Order = {
        id: `UH${n}`,
        invoiceNo: `INV/26-27/${String(n).padStart(5, "0")}`,
        customerId: customer.id,
        customer: addr,
        items: lines.map((l) => ({ productId: l.p.id, name: l.p.name, price: l.p.price, qty: l.qty, image: l.p.image })),
        subtotal: sub,
        shipping: 0,
        tax: Math.round(sub - sub / (1 + SITE.gstRate)),
        discount,
        total: Math.max(0, sub - discount),
        paymentMethod: method,
        paymentStatus: "Paid",
        status: "Delivered",
        channel: "Store",
        createdAt: new Date().toISOString(),
      };
      setState((s) => ({
        ...s,
        customers,
        orders: [order, ...s.orders],
        products: s.products.map((p) => {
          const line = order.items.find((i) => i.productId === p.id);
          return line ? { ...p, stock: Math.max(0, p.stock - line.qty) } : p;
        }),
      }));
      return order;
    },

    updateOrder: (id, patch) => setState((s) => ({ ...s, orders: s.orders.map((o) => (o.id === id ? { ...o, ...patch } : o)) })),

    loginCustomer: (data) => {
      const { customer, customers } = upsertCustomer(state.customers, data);
      setState((s) => ({ ...s, customers, user: customer }));
      return customer;
    },
    logout: () => setState((s) => ({ ...s, user: null })),
    adminLogin: () => setState((s) => ({ ...s, admin: true })),
    adminLogout: () => setState((s) => ({ ...s, admin: false })),

    addEnquiry: (e) =>
      setState((s) => ({ ...s, enquiries: [{ ...e, id: uid("E"), createdAt: new Date().toISOString(), read: false }, ...s.enquiries] })),
    markEnquiryRead: (id) => setState((s) => ({ ...s, enquiries: s.enquiries.map((e) => (e.id === id ? { ...e, read: true } : e)) })),

    resetDemo: () => {
      Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
      setState((s) => ({
        ...s,
        products: SEED_PRODUCTS,
        customers: SEED_CUSTOMERS,
        orders: buildSeedOrders(SEED_PRODUCTS),
        enquiries: [],
        cart: [],
        user: null,
      }));
    },
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
