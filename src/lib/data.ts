import type { Customer, Order, OrderItem, Product, Service } from "./types";
import { unsplash } from "./utils";

export const CATEGORIES = [
  { name: "Laptops", icon: "Laptop", image: unsplash("1496181133206-80ce9b88a853", 600) },
  { name: "Desktops", icon: "Monitor", image: unsplash("1587831990711-23ca6441447b", 600) },
  { name: "Components", icon: "Cpu", image: unsplash("1518770660439-4636190af475", 600) },
  { name: "Networking", icon: "Router", image: unsplash("1544197150-b99a580bb7a8", 600) },
  { name: "CCTV & Security", icon: "Cctv", image: unsplash("1557597774-9d273605dfa9", 600) },
  { name: "Accessories", icon: "Keyboard", image: unsplash("1587829741301-dc798b83add3", 600) },
  { name: "Printers", icon: "Printer", image: unsplash("1612815154858-60aa4c59eaa6", 600) },
  { name: "Smart TV & Display", icon: "Tv", image: unsplash("1593359677879-a4bb92f829d1", 600) },
] as const;

export const BRANDS = ["HP", "Dell", "Lenovo", "Asus", "Acer", "Apple", "TP-Link", "Hikvision", "Logitech", "Samsung", "Canon", "Epson"];

const p = (x: Omit<Product, "active" | "createdAt"> & Partial<Pick<Product, "active" | "createdAt">>): Product => ({
  active: true,
  createdAt: "2026-09-01T10:00:00.000Z",
  ...x,
});

export const SEED_PRODUCTS: Product[] = [
  p({
    id: "P1001", name: "HP Pavilion 15 — Intel Core i5 13th Gen", category: "Laptops", brand: "HP",
    price: 58990, mrp: 72999, rating: 4.6, reviews: 214, stock: 18, badge: "Bestseller", featured: true,
    image: unsplash("1496181133206-80ce9b88a853"),
    gallery: [unsplash("1496181133206-80ce9b88a853"), unsplash("1517336714731-489689fd1ca8"), unsplash("1525547719571-a2d4ac8945e2")],
    short: "16GB RAM · 512GB SSD · 15.6\" FHD IPS · Windows 11 · MS Office",
    description: "A sleek everyday performer built for work, study and entertainment. The 13th Gen Intel Core i5 processor and fast NVMe SSD deliver snappy multitasking, while the micro-edge FHD display and B&O audio make movies and calls a delight.",
    specs: { Processor: "Intel Core i5-1335U", RAM: "16GB DDR4", Storage: "512GB NVMe SSD", Display: "15.6\" FHD IPS, 250 nits", Graphics: "Intel Iris Xe", OS: "Windows 11 Home", Warranty: "1 Year Onsite" },
  }),
  p({
    id: "P1002", name: "Dell Inspiron 14 — AMD Ryzen 7", category: "Laptops", brand: "Dell",
    price: 64490, mrp: 79990, rating: 4.5, reviews: 156, stock: 12, featured: true,
    image: unsplash("1525547719571-a2d4ac8945e2"),
    short: "16GB RAM · 1TB SSD · 14\" FHD+ · Backlit Keyboard",
    description: "Compact, powerful and built to last. The Ryzen 7 processor handles creative workloads with ease while the 16:10 display gives you more room to work.",
    specs: { Processor: "AMD Ryzen 7 7730U", RAM: "16GB DDR4", Storage: "1TB NVMe SSD", Display: "14\" FHD+ 16:10", OS: "Windows 11 Home", Warranty: "1 Year" },
  }),
  p({
    id: "P1003", name: "Apple MacBook Air M2 — 13.6\"", category: "Laptops", brand: "Apple",
    price: 89900, mrp: 99900, rating: 4.9, reviews: 532, stock: 7, badge: "Premium", featured: true,
    image: unsplash("1517336714731-489689fd1ca8"),
    short: "8GB Unified Memory · 256GB SSD · Liquid Retina Display",
    description: "Strikingly thin and fast. The M2 chip delivers incredible performance with up to 18 hours of battery life in a fanless design.",
    specs: { Chip: "Apple M2 8-core CPU", Memory: "8GB Unified", Storage: "256GB SSD", Display: "13.6\" Liquid Retina", Battery: "Up to 18 hours", Warranty: "1 Year Apple" },
  }),
  p({
    id: "P1004", name: "Lenovo ThinkPad E14 (Refurbished — Grade A)", category: "Laptops", brand: "Lenovo",
    price: 26990, mrp: 48990, rating: 4.4, reviews: 98, stock: 22, badge: "Refurbished",
    image: unsplash("1588872657578-7efd1f1555ed"),
    short: "Core i5 10th Gen · 8GB · 256GB SSD · 6 Months Warranty",
    description: "Certified refurbished business laptop, tested on 40+ quality checkpoints. Ideal for students and offices looking for reliability on a budget.",
    specs: { Processor: "Intel Core i5-10210U", RAM: "8GB", Storage: "256GB SSD", Condition: "Grade A Refurbished", Warranty: "6 Months" },
  }),
  p({
    id: "P1005", name: "Unique Gaming PC — Ryzen 5 / RTX 4060", category: "Desktops", brand: "Asus",
    price: 82990, mrp: 96500, rating: 4.8, reviews: 74, stock: 5, badge: "Hot", featured: true,
    image: unsplash("1587831990711-23ca6441447b"),
    short: "Ryzen 5 7600 · RTX 4060 8GB · 32GB DDR5 · 1TB NVMe · RGB",
    description: "Custom-built and stress-tested in our lab. Smooth 1080p/1440p gaming with ray tracing, whisper-quiet cooling and tidy cable management.",
    specs: { CPU: "AMD Ryzen 5 7600", GPU: "NVIDIA RTX 4060 8GB", RAM: "32GB DDR5 5600MHz", Storage: "1TB Gen4 NVMe", PSU: "650W 80+ Bronze", Warranty: "3 Years (parts)" },
  }),
  p({
    id: "P1006", name: "Dell OptiPlex Office Desktop Combo", category: "Desktops", brand: "Dell",
    price: 34990, mrp: 42990, rating: 4.3, reviews: 61, stock: 14,
    image: unsplash("1593640408182-31c70c8268f5"),
    short: "Core i3 12th Gen · 8GB · 512GB SSD · 21.5\" Monitor · KB+Mouse",
    description: "Complete plug-and-play office setup — perfect for billing counters, schools and small offices.",
    specs: { Processor: "Intel Core i3-12100", RAM: "8GB", Storage: "512GB SSD", Monitor: "21.5\" FHD", OS: "Windows 11 Pro", Warranty: "1 Year" },
  }),
  p({
    id: "P1007", name: "Samsung 980 PRO 1TB NVMe SSD", category: "Components", brand: "Samsung",
    price: 7499, mrp: 11999, rating: 4.8, reviews: 412, stock: 40, badge: "Deal",
    image: unsplash("1597872200969-2b65d56bd16b"),
    short: "PCIe Gen4 · Up to 7000 MB/s read · 5 Years Warranty",
    description: "Next-level speed for gaming and heavy workloads. Upgrade your PC or laptop and feel the difference instantly.",
    specs: { Capacity: "1TB", Interface: "PCIe 4.0 x4 NVMe", "Read Speed": "7000 MB/s", "Write Speed": "5000 MB/s", Warranty: "5 Years" },
  }),
  p({
    id: "P1008", name: "Corsair Vengeance 16GB DDR5 RAM", category: "Components", brand: "Asus",
    price: 5299, mrp: 6999, rating: 4.6, reviews: 188, stock: 33,
    image: unsplash("1562976540-1502c2145186"),
    short: "DDR5 5200MHz · Low Profile · Lifetime Warranty",
    description: "High-performance memory upgrade for modern desktops.",
    specs: { Capacity: "16GB (1x16)", Type: "DDR5", Speed: "5200MHz", Warranty: "Lifetime" },
  }),
  p({
    id: "P1009", name: "TP-Link Archer AX55 Wi-Fi 6 Router", category: "Networking", brand: "TP-Link",
    price: 5999, mrp: 8999, rating: 4.5, reviews: 276, stock: 25, featured: true,
    image: unsplash("1606904825846-647eb07f5be2"),
    short: "AX3000 Dual Band · Gigabit Ports · OneMesh",
    description: "Faster, more reliable Wi-Fi for homes and offices with dozens of connected devices.",
    specs: { Standard: "Wi-Fi 6 (802.11ax)", Speed: "AX3000", Ports: "4x Gigabit LAN, 1x WAN", Warranty: "3 Years" },
  }),
  p({
    id: "P1010", name: "Hikvision 4MP IP CCTV Camera Kit (4 Cam)", category: "CCTV & Security", brand: "Hikvision",
    price: 18990, mrp: 25990, rating: 4.7, reviews: 143, stock: 9, badge: "Installation Free", featured: true,
    image: unsplash("1557597774-9d273605dfa9"),
    short: "4x 4MP Cameras · 8CH NVR · 1TB HDD · Mobile View",
    description: "Complete IP surveillance kit with night vision and remote mobile monitoring. Includes free professional installation within city limits.",
    specs: { Cameras: "4 x 4MP IP Bullet/Dome", NVR: "8 Channel PoE", Storage: "1TB Surveillance HDD", "Night Vision": "Up to 30m", Warranty: "2 Years" },
  }),
  p({
    id: "P1011", name: "Logitech MX Keys Wireless Keyboard", category: "Accessories", brand: "Logitech",
    price: 9495, mrp: 12995, rating: 4.7, reviews: 301, stock: 20,
    image: unsplash("1587829741301-dc798b83add3"),
    short: "Backlit · Multi-device · USB-C Rechargeable",
    description: "Advanced wireless illuminated keyboard crafted for efficiency and comfort.",
    specs: { Connectivity: "Bluetooth / Logi Bolt", Backlight: "Smart illumination", Battery: "Up to 10 days", Warranty: "1 Year" },
  }),
  p({
    id: "P1012", name: "Logitech MX Master 3S Mouse", category: "Accessories", brand: "Logitech",
    price: 8995, mrp: 10995, rating: 4.8, reviews: 512, stock: 28, featured: true,
    image: unsplash("1527864550417-7fd91fc51a46"),
    short: "8K DPI · Quiet Clicks · MagSpeed Scroll",
    description: "Iconic ergonomic performance mouse with ultra-fast scrolling and quiet clicks.",
    specs: { DPI: "200 – 8000", Buttons: "7", Battery: "Up to 70 days", Warranty: "1 Year" },
  }),
  p({
    id: "P1013", name: "Sony WH-1000XM5 Headphones", category: "Accessories", brand: "Samsung",
    price: 26990, mrp: 34990, rating: 4.8, reviews: 230, stock: 11,
    image: unsplash("1505740420928-5e560c06d30e"),
    short: "Industry-leading ANC · 30h Battery · Hi-Res Audio",
    description: "Immersive sound with best-in-class noise cancellation for work and travel.",
    specs: { Type: "Over-ear Wireless", ANC: "Yes", Battery: "30 hours", Warranty: "1 Year" },
  }),
  p({
    id: "P1014", name: "Epson EcoTank L3250 Wi-Fi Printer", category: "Printers", brand: "Epson",
    price: 13499, mrp: 16999, rating: 4.5, reviews: 389, stock: 16, featured: true,
    image: unsplash("1612815154858-60aa4c59eaa6"),
    short: "Print · Scan · Copy · Ultra-low cost per page",
    description: "Ink tank printer with wireless printing — ideal for home and small office use.",
    specs: { Functions: "Print, Scan, Copy", Connectivity: "Wi-Fi, Wi-Fi Direct, USB", "Print Speed": "33 ppm", Warranty: "1 Year / 30,000 pages" },
  }),
  p({
    id: "P1015", name: "Samsung 50\" Crystal 4K Smart TV", category: "Smart TV & Display", brand: "Samsung",
    price: 38990, mrp: 54900, rating: 4.6, reviews: 167, stock: 6,
    image: unsplash("1593359677879-a4bb92f829d1"),
    short: "4K UHD · HDR10+ · Tizen OS · 20W Speakers",
    description: "Crisp 4K picture with vivid colours and all your favourite streaming apps built in.",
    specs: { Size: "50 inch", Resolution: "3840 x 2160", HDR: "HDR10+", Audio: "20W", Warranty: "1 Year + 1 Year Panel" },
  }),
  p({
    id: "P1016", name: "LG 27\" UltraGear QHD Gaming Monitor", category: "Smart TV & Display", brand: "Samsung",
    price: 21999, mrp: 29999, rating: 4.7, reviews: 129, stock: 10,
    image: unsplash("1527443224154-c4a3942d3acf"),
    short: "2560x1440 · 165Hz · 1ms · IPS · HDR10",
    description: "Fast, fluid and colour-accurate — great for gaming and design work.",
    specs: { Size: "27 inch", Resolution: "QHD 2560x1440", "Refresh Rate": "165Hz", Panel: "Nano IPS", Warranty: "3 Years" },
  }),
];

export const SERVICES: Service[] = [
  {
    id: "repair", title: "Laptop & Desktop Repair", icon: "Wrench",
    short: "Chip-level and board-level repair for all major brands with genuine parts.",
    points: ["Motherboard & chip-level repair", "Screen, keyboard & battery replacement", "Hinge and body repair", "Same-day diagnosis"],
    image: unsplash("1581092918056-0c4c3acd3789"),
  },
  {
    id: "rental", title: "Rental Services", icon: "CalendarClock",
    short: "Laptops, desktops, projectors and servers on rent — daily, monthly or for events.",
    points: ["Flexible daily / monthly plans", "Bulk rentals for offices & events", "Doorstep delivery & setup", "Free replacement on failure"],
    image: unsplash("1531297484001-80022131f5a1"),
  },
  {
    id: "refurbished", title: "Refurbished Computer Sales", icon: "RefreshCcw",
    short: "Certified Grade-A refurbished systems tested on 40+ checkpoints with warranty.",
    points: ["40+ point quality check", "Up to 60% cheaper than new", "6–12 months warranty", "Business-grade brands"],
    image: unsplash("1588872657578-7efd1f1555ed"),
  },
  {
    id: "data-recovery", title: "Data Recovery", icon: "HardDriveDownload",
    short: "Recover lost data from HDD, SSD, pen drives and memory cards — safely and confidentially.",
    points: ["HDD / SSD / USB / SD cards", "Deleted & formatted data", "Clean-room grade process", "No data, no charge"],
    image: unsplash("1597872200969-2b65d56bd16b"),
  },
  {
    id: "cctv", title: "CCTV Installation", icon: "Cctv",
    short: "End-to-end surveillance solutions for homes, shops, offices and factories.",
    points: ["Site survey & planning", "IP / HD camera installation", "Mobile remote viewing", "AMC & maintenance"],
    image: unsplash("1557597774-9d273605dfa9"),
  },
  {
    id: "networking", title: "Networking & Wi-Fi Setup", icon: "Network",
    short: "Structured cabling, Wi-Fi coverage, firewalls and office network setup.",
    points: ["LAN / structured cabling", "Mesh Wi-Fi coverage", "Firewall & VPN", "Server rack setup"],
    image: unsplash("1544197150-b99a580bb7a8"),
  },
  {
    id: "amc", title: "Annual Maintenance (AMC)", icon: "ShieldCheck",
    short: "Hassle-free IT support contracts for businesses with priority response.",
    points: ["Preventive maintenance visits", "Priority on-call support", "Asset tracking", "Custom SLAs"],
    image: unsplash("1522071820081-009f0129c71c"),
  },
  {
    id: "software", title: "Software & OS Installation", icon: "MonitorCog",
    short: "Genuine OS, antivirus, drivers and business software installed and configured.",
    points: ["Windows / Linux / macOS", "Antivirus & security", "Tally, MS Office & more", "Data backup & migration"],
    image: unsplash("1550745165-9bc0b252726f"),
  },
];

export const TESTIMONIALS = [
  { name: "Rahul Verma", role: "Small Business Owner", text: "Bought 6 desktops and a CCTV kit for my office. Installation was quick and the team explained everything clearly. Highly recommended!", rating: 5 },
  { name: "Sneha Reddy", role: "Engineering Student", text: "Got a refurbished ThinkPad at half the price. It works like new and they even gave me 6 months warranty. Amazing service.", rating: 5 },
  { name: "Mohammed Irfan", role: "Freelance Designer", text: "They recovered 3 years of project files from my crashed hard drive. Lifesavers! Pricing was transparent too.", rating: 5 },
  { name: "Priya Nair", role: "School Administrator", text: "Their AMC support for our computer lab has been excellent. Response time is fast and the staff is very professional.", rating: 4 },
];

/* ---------- Demo ERP data (generated on the client relative to "now") ---------- */

export const SEED_CUSTOMERS: Customer[] = [
  { id: "C101", name: "Rahul Verma", email: "rahul.verma@example.com", phone: "9876501234", city: "Muzaffarnagar", verified: true, createdAt: "2026-08-02T09:00:00.000Z" },
  { id: "C102", name: "Sneha Reddy", email: "sneha.r@example.com", phone: "9123456780", city: "Meerut", verified: true, createdAt: "2026-08-14T09:00:00.000Z" },
  { id: "C103", name: "Mohammed Irfan", email: "irfan.m@example.com", phone: "9988776655", city: "Muzaffarnagar", verified: true, createdAt: "2026-09-03T09:00:00.000Z" },
  { id: "C104", name: "Priya Nair", email: "priya.nair@example.com", phone: "9012345678", city: "Shamli", verified: true, createdAt: "2026-09-18T09:00:00.000Z" },
  { id: "C105", name: "Arjun Kumar", email: "arjun.k@example.com", phone: "9090909090", city: "Saharanpur", verified: false, createdAt: "2026-10-01T09:00:00.000Z" },
  { id: "C106", name: "Kavya Sharma", email: "kavya.s@example.com", phone: "9345678120", city: "Muzaffarnagar", verified: true, createdAt: "2026-10-08T09:00:00.000Z" },
];

export function buildSeedOrders(products: Product[]): Order[] {
  const day = 86400000;
  const now = Date.now();
  const plan: [string, [string, number][], number, Order["status"], Order["paymentMethod"], Order["paymentStatus"], Order["channel"]][] = [
    ["C101", [["P1006", 2], ["P1010", 1]], 0, "Processing", "Razorpay", "Paid", "Online"],
    ["C102", [["P1004", 1]], 1, "Shipped", "UPI", "Paid", "Online"],
    ["C103", [["P1007", 1], ["P1012", 1]], 1, "Pending", "COD", "Pending", "Online"],
    ["C104", [["P1014", 2]], 2, "Delivered", "Cash", "Paid", "Store"],
    ["C106", [["P1001", 1]], 3, "Delivered", "Card", "Paid", "Online"],
    ["C105", [["P1009", 1], ["P1011", 1]], 4, "Cancelled", "Razorpay", "Refunded", "Online"],
    ["C101", [["P1005", 1]], 5, "Delivered", "Razorpay", "Paid", "Online"],
    ["C102", [["P1013", 1]], 6, "Delivered", "UPI", "Paid", "Store"],
    ["C103", [["P1015", 1], ["P1008", 2]], 8, "Delivered", "Card", "Paid", "Online"],
    ["C104", [["P1003", 1]], 11, "Delivered", "Razorpay", "Paid", "Online"],
  ];
  return plan.map(([cid, lines, ago, status, method, pay, channel], i) => {
    const c = SEED_CUSTOMERS.find((x) => x.id === cid)!;
    const items: OrderItem[] = lines.map(([pid, qty]) => {
      const pr = products.find((x) => x.id === pid)!;
      return { productId: pid, name: pr.name, price: pr.price, qty, image: pr.image };
    });
    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
    const shipping = subtotal >= 4999 ? 0 : 149;
    const tax = Math.round(subtotal - subtotal / 1.18);
    const n = 1050 - i;
    return {
      id: `UH${n}`,
      invoiceNo: `INV/26-27/${String(n).padStart(5, "0")}`,
      customerId: cid,
      customer: { name: c.name, phone: c.phone, email: c.email, line1: "House No. 45, Civil Lines", city: c.city ?? "Muzaffarnagar", state: "Uttar Pradesh", pincode: "251001" },
      items, subtotal, shipping, tax, discount: 0, total: subtotal + shipping,
      paymentMethod: method, paymentStatus: pay,
      paymentRef: pay === "Paid" || pay === "Refunded" ? `pay_${(n * 7919).toString(36).toUpperCase()}` : undefined,
      status, channel,
      createdAt: new Date(now - ago * day - i * 3600000).toISOString(),
    };
  });
}
