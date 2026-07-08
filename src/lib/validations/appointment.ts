import { z } from "zod";

// Russian phone: allows +7 / 8, spaces, dashes, parentheses. 10–15 digits.
const phoneRegex = /^(\+?\d[\d\s\-()]{9,15})$/;

export const appointmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Введите имя (минимум 2 символа)")
    .max(60, "Слишком длинное имя"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Введите корректный номер телефона"),
  service: z.string().min(1, "Выберите услугу"),
  date: z
    .string()
    .min(1, "Выберите дату")
    .refine((value) => {
      const picked = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return picked >= today;
    }, "Дата не может быть в прошлом"),
  time: z.string().min(1, "Выберите время"),
  comment: z.string().max(500, "Комментарий слишком длинный").optional(),
  // Honeypot: must stay empty. Bots fill it, humans never see it.
  company: z.string().optional(),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
