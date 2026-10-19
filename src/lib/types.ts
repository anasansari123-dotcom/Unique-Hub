export type Product = {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  gallery?: string[];
  badge?: string;
  short: string;
  description: string;
  specs: Record<string, string>;
  featured?: boolean;
  active: boolean;
  createdAt: string;
};

export type CartItem = { productId: string; qty: number };

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
export type PaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded";
export type PaymentMethod = "Razorpay" | "UPI" | "Card" | "COD" | "Cash";

export type Address = {
  name: string;
  phone: string;
  email: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
};

export type OrderItem = { productId: string; name: string; price: number; qty: number; image: string };

export type Order = {
  id: string;
  invoiceNo: string;
  customerId: string;
  customer: Address;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentRef?: string;
  status: OrderStatus;
  channel: "Online" | "Store";
  note?: string;
  createdAt: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  verified: boolean;
  createdAt: string;
};

export type Service = {
  id: string;
  title: string;
  icon: string;
  short: string;
  points: string[];
  image: string;
};

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
  read: boolean;
};
