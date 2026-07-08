export const SITE = {
  name: "Lumina",
  legalName: 'Стоматологическая клиника «Lumina»',
  tagline: "Премиальная стоматология",
  description:
    "Премиальная стоматологическая клиника Lumina: имплантация, виниры, ортодонтия и эстетика мирового уровня. Точная диагностика, комфорт и результат, которому доверяют.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lumina-dental.example.com",
  phone: "+7 (495) 000-00-00",
  phoneHref: "tel:+74950000000",
  email: "hello@lumina-dental.ru",
  emailHref: "mailto:hello@lumina-dental.ru",
  address: "Москва, Пресненская набережная, 12",
  addressShort: "Пресненская наб., 12",
  geo: { lat: 55.7495, lng: 37.5378 },
  hours: [
    { day: "Пн — Пт", time: "09:00 — 21:00" },
    { day: "Сб — Вс", time: "10:00 — 19:00" },
  ],
  socials: [
    { label: "Telegram", href: "https://t.me/" },
    { label: "WhatsApp", href: "https://wa.me/" },
    { label: "VK", href: "https://vk.com/" },
    { label: "Instagram", href: "https://instagram.com/" },
  ],
} as const;

export const NAV_LINKS = [
  { label: "Услуги", href: "#services" },
  { label: "Врачи", href: "#doctors" },
  { label: "Результаты", href: "#cases" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Вопросы", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
] as const;

export const ROUTE_MAP_URL = `https://yandex.ru/maps/?rtext=~${SITE.geo.lat},${SITE.geo.lng}&rtt=auto`;
