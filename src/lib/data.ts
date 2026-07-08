import {
  Sparkles,
  Smile,
  ShieldCheck,
  Stethoscope,
  Braces,
  Baby,
  Microscope,
  HeartPulse,
  Clock,
  Award,
  Gem,
  Leaf,
} from "lucide-react";

import type {
  Service,
  Doctor,
  Review,
  Advantage,
  FaqItem,
  Stat,
  Case,
} from "@/types";

export const SERVICES: Service[] = [
  {
    id: "implants",
    icon: Gem,
    title: "Имплантация",
    description:
      "Восстановление зубов имплантами Straumann и Nobel с цифровым планированием и пожизненной гарантией.",
    priceFrom: 45000,
    image: "/images/treatment-1.jpg",
    featured: true,
  },
  {
    id: "veneers",
    icon: Sparkles,
    title: "Виниры",
    description:
      "Керамические виниры E.max: естественная эстетика улыбки по цифровому дизайну Digital Smile Design.",
    priceFrom: 38000,
    image: "/images/treatment-2.jpg",
    featured: true,
  },
  {
    id: "caries",
    icon: ShieldCheck,
    title: "Лечение кариеса",
    description:
      "Безболезненное лечение под микроскопом с сохранением здоровых тканей и незаметными реставрациями.",
    priceFrom: 4500,
    image: "/images/treatment-3.jpg",
  },
  {
    id: "hygiene",
    icon: Leaf,
    title: "Профессиональная чистка",
    description:
      "Комплексная гигиена Air Flow и ультразвук: свежесть, здоровье дёсен и естественная белизна.",
    priceFrom: 6900,
    image: "/images/treatment-1.jpg",
  },
  {
    id: "ortho",
    icon: Braces,
    title: "Ортодонтия",
    description:
      "Элайнеры и брекет-системы для ровной улыбки с прогнозируемым результатом и 3D-контролем.",
    priceFrom: 120000,
    image: "/images/treatment-2.jpg",
  },
  {
    id: "kids",
    icon: Baby,
    title: "Детская стоматология",
    description:
      "Бережный приём без страха и стресса: игровой подход, лечение во сне и профилактика с раннего возраста.",
    priceFrom: 3500,
    image: "/images/treatment-3.jpg",
  },
];

export const DOCTORS: Doctor[] = [
  {
    id: "sokolova",
    name: "Анна Соколова",
    specialty: "Хирург-имплантолог",
    experienceYears: 16,
    rating: 5.0,
    reviews: 214,
    image: "/images/doctor-1.jpg",
    tags: ["Имплантация", "Костная пластика"],
  },
  {
    id: "volkov",
    name: "Дмитрий Волков",
    specialty: "Ортопед-эстетист",
    experienceYears: 12,
    rating: 5.0,
    reviews: 187,
    image: "/images/doctor-2.jpg",
    tags: ["Виниры", "Digital Smile"],
  },
  {
    id: "orlova",
    name: "Мария Орлова",
    specialty: "Врач-ортодонт",
    experienceYears: 10,
    rating: 4.9,
    reviews: 156,
    image: "/images/doctor-3.jpg",
    tags: ["Элайнеры", "Брекеты"],
  },
  {
    id: "lebedev",
    name: "Игорь Лебедев",
    specialty: "Терапевт-эндодонтист",
    experienceYears: 14,
    rating: 5.0,
    reviews: 203,
    image: "/images/doctor-4.jpg",
    tags: ["Лечение под микроскопом", "Эндодонтия"],
  },
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Екатерина М.",
    avatar: "/images/patient-1.jpg",
    rating: 5,
    date: "2 недели назад",
    service: "Виниры",
    text: "Сделала виниры у Дмитрия — результат превзошёл все ожидания. Улыбка выглядит абсолютно естественно, никто не догадывается. Атмосфера в клинике как в дорогом отеле.",
  },
  {
    id: "r2",
    author: "Александр П.",
    avatar: "/images/patient-2.jpg",
    rating: 5,
    date: "1 месяц назад",
    service: "Имплантация",
    text: "Поставил два импланта, боялся до последнего. Всё прошло без боли и стресса, доктор объясняла каждый шаг. Через месяц забыл, что вообще были проблемы.",
  },
  {
    id: "r3",
    author: "Ольга К.",
    avatar: "/images/patient-3.jpg",
    rating: 5,
    date: "3 недели назад",
    service: "Профессиональная чистка",
    text: "Хожу на чистку каждые полгода. Всегда идеальный сервис, аккуратно и по времени. Зубы после Air Flow как новые, дёсны в отличном состоянии.",
  },
  {
    id: "r4",
    author: "Никита В.",
    avatar: "/images/patient-4.jpg",
    rating: 5,
    date: "2 месяца назад",
    service: "Ортодонтия",
    text: "Ношу элайнеры, за 8 месяцев прикус изменился кардинально. Мария контролирует каждый этап через 3D-модель, всё прозрачно и предсказуемо.",
  },
  {
    id: "r5",
    author: "Светлана Д.",
    avatar: "/images/patient-5.jpg",
    rating: 5,
    date: "1 неделю назад",
    service: "Детская стоматология",
    text: "Привела сына 5 лет, который панически боялся врачей. Ушли счастливые, ребёнок сам просится прийти ещё. Отдельное спасибо за терпение и игровой подход.",
  },
];

export const ADVANTAGES: Advantage[] = [
  {
    id: "a1",
    icon: Microscope,
    title: "Лечение под микроскопом",
    description:
      "Точность до микрона на каждом приёме — от кариеса до сложной эндодонтии.",
  },
  {
    id: "a2",
    icon: ShieldCheck,
    title: "Гарантия на результат",
    description:
      "Пожизненная гарантия на импланты и до 5 лет на реставрации и протезирование.",
  },
  {
    id: "a3",
    icon: HeartPulse,
    title: "Лечение без боли",
    description:
      "Современная анестезия и седация: комфорт даже для самых тревожных пациентов.",
  },
  {
    id: "a4",
    icon: Stethoscope,
    title: "Врачи с опытом 10+ лет",
    description:
      "Команда с международными сертификатами и тысячами успешных случаев.",
  },
  {
    id: "a5",
    icon: Clock,
    title: "Точно по времени",
    description:
      "Уважаем ваше время: приём начинается минута в минуту, без очередей.",
  },
  {
    id: "a6",
    icon: Award,
    title: "Цифровая диагностика",
    description:
      "3D-томография и Digital Smile Design для прогнозируемого результата.",
  },
];

export const FAQ: FaqItem[] = [
  {
    id: "f1",
    question: "Больно ли лечить зубы в вашей клинике?",
    answer:
      "Нет. Мы используем современную анестезию последнего поколения, а для тревожных пациентов доступна седация. Большинство процедур проходят абсолютно безболезненно, и мы всегда контролируем ваш комфорт.",
  },
  {
    id: "f2",
    question: "Сколько служат импланты и есть ли гарантия?",
    answer:
      "Мы работаем с системами Straumann и Nobel Biocare и даём пожизненную гарантию на сами импланты. При соблюдении гигиены и регулярных осмотрах они служат десятилетиями.",
  },
  {
    id: "f3",
    question: "Можно ли записаться на консультацию бесплатно?",
    answer:
      "Да. Первичная консультация с составлением плана лечения и 3D-диагностикой проводится бесплатно. Вы получите полную картину и точную стоимость до начала лечения.",
  },
  {
    id: "f4",
    question: "Есть ли рассрочка на лечение?",
    answer:
      "Да, доступна беспроцентная рассрочка на срок до 24 месяцев, а также оформление налогового вычета. Менеджер подберёт удобный формат оплаты на консультации.",
  },
  {
    id: "f5",
    question: "Как быстро можно попасть на приём?",
    answer:
      "В большинстве случаев мы принимаем в день обращения или на следующий день. При острой боли предусмотрены экстренные окна — позвоните нам, и мы найдём время.",
  },
  {
    id: "f6",
    question: "Работаете ли вы с детьми?",
    answer:
      "Да, у нас есть детское отделение с врачами, специализирующимися на работе с детьми. Мы используем игровой подход, а при необходимости — лечение во сне под контролем анестезиолога.",
  },
];

export const STATS: Stat[] = [
  { value: 18, suffix: " лет", label: "на рынке" },
  { value: 24000, suffix: "+", label: "пациентов" },
  { value: 12, label: "врачей-экспертов" },
  { value: 5, suffix: ".0", label: "рейтинг клиники" },
];

export const CASES: Case[] = [
  {
    id: "c1",
    title: "Виниры на 8 зубов",
    before: "/images/before-after-1.jpg",
    after: "/images/before-after-2.jpg",
  },
];

export const SERVICE_OPTIONS = SERVICES.map((s) => s.title);
export const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];
