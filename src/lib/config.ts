// Business details — update these with the client's real information.
export const SITE = {
  name: "Unique Hub 24",
  legalName: "Unique Traders",
  tagline: "Your One-Stop Tech Destination",
  phone: "+91 93680 52112", // Service number
  salesPhone: "0131-7966331",
  whatsapp: "919837222112", // country code + number, no "+" or spaces
  whatsappDisplay: "+91 98372 22112",
  email: "unqind2112@gmail.com",
  address: "159-A/23, Prakash Market, Prakash Chowk, Muzaffarnagar, Uttar Pradesh",
  city: "Muzaffarnagar",
  state: "Uttar Pradesh",
  mapQuery: "Prakash Chowk, Muzaffarnagar, Uttar Pradesh",
  hours: "Mon – Sat: 10:00 AM – 8:00 PM", // TODO: confirm with client
  gstin: "09XXXXXXXXXXXZX", // TODO: client's real GSTIN
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
    x: "https://x.com/",
  },
  freeShippingAbove: 4999,
  shippingFee: 149,
  gstRate: 0.18,
};

export const telHref = (n: string) => `tel:${n.replace(/[\s-]/g, "")}`;

export const whatsappLink = (text = `Hi ${SITE.name}, I have an enquiry.`) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

// Demo admin credentials (frontend only — replace with real auth on the backend)
export const ADMIN_DEMO = { email: "admin@uniquehub24.com", password: "admin123" };
