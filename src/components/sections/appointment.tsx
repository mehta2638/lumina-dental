"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, CalendarCheck, ShieldCheck, PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  appointmentSchema,
  type AppointmentInput,
} from "@/lib/validations/appointment";
import { SERVICE_OPTIONS, TIME_SLOTS } from "@/lib/data";
import { SITE } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";

type Status = "idle" | "submitting" | "success" | "error";

export function Appointment() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      comment: "",
      company: "",
    },
  });

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (data: AppointmentInput) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="appointment" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-lifted)]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* Left — value proposition */}
            <div className="relative flex flex-col justify-between gap-10 bg-primary p-8 text-primary-foreground sm:p-12">
              <div
                aria-hidden
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, rgb(20 184 166 / 0.5), transparent 45%), radial-gradient(circle at 80% 80%, rgb(14 165 233 / 0.4), transparent 45%)",
                }}
              />
              <div className="relative flex flex-col gap-4">
                <span className="w-fit rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
                  Запись на приём
                </span>
                <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                  Первая консультация — бесплатно
                </h2>
                <p className="max-w-sm text-primary-foreground/70">
                  Оставьте заявку, и администратор перезвонит в течение 15 минут,
                  чтобы подтвердить удобное время.
                </p>
              </div>

              <ul className="relative flex flex-col gap-4">
                {[
                  { icon: ShieldCheck, text: "3D-диагностика и план лечения" },
                  { icon: CalendarCheck, text: "Удобное время без очередей" },
                  { icon: PhoneCall, text: "Ответ в течение 15 минут" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm">
                    <span className="grid size-9 place-items-center rounded-xl bg-white/10 text-accent">
                      <Icon className="size-5" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — form / success */}
            <div className="p-8 sm:p-12">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <SuccessState key="success" onReset={() => setStatus("idle")} />
                ) : (
                  <motion.form
                    key="form"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="flex flex-col gap-5"
                  >
                    {/* Honeypot — hidden from users */}
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute h-0 w-0 opacity-0"
                      {...register("company")}
                    />

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Имя" error={errors.name?.message} htmlFor="name">
                        <Input
                          id="name"
                          placeholder="Как к вам обращаться"
                          aria-invalid={!!errors.name}
                          {...register("name")}
                        />
                      </Field>

                      <Field label="Телефон" error={errors.phone?.message} htmlFor="phone">
                        <Input
                          id="phone"
                          type="tel"
                          inputMode="tel"
                          placeholder="+7 (___) ___-__-__"
                          aria-invalid={!!errors.phone}
                          {...register("phone")}
                        />
                      </Field>
                    </div>

                    <Field label="Услуга" error={errors.service?.message} htmlFor="service">
                      <Controller
                        control={control}
                        name="service"
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger id="service" aria-invalid={!!errors.service}>
                              <SelectValue placeholder="Выберите направление" />
                            </SelectTrigger>
                            <SelectContent>
                              {SERVICE_OPTIONS.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </Field>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Дата" error={errors.date?.message} htmlFor="date">
                        <Input
                          id="date"
                          type="date"
                          min={today}
                          aria-invalid={!!errors.date}
                          {...register("date")}
                        />
                      </Field>

                      <Field label="Время" error={errors.time?.message} htmlFor="time">
                        <Controller
                          control={control}
                          name="time"
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger id="time" aria-invalid={!!errors.time}>
                                <SelectValue placeholder="Выберите время" />
                              </SelectTrigger>
                              <SelectContent>
                                {TIME_SLOTS.map((slot) => (
                                  <SelectItem key={slot} value={slot}>
                                    {slot}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </Field>
                    </div>

                    <Field label="Комментарий" error={errors.comment?.message} htmlFor="comment" optional>
                      <Textarea
                        id="comment"
                        placeholder="Опишите, что вас беспокоит (необязательно)"
                        rows={3}
                        {...register("comment")}
                      />
                    </Field>

                    {status === "error" && (
                      <p className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger">
                        Не удалось отправить заявку. Позвоните нам по номеру{" "}
                        <a href={SITE.phoneHref} className="font-semibold underline">
                          {SITE.phone}
                        </a>
                        .
                      </p>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      disabled={status === "submitting"}
                      className="w-full"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="size-5 animate-spin" />
                          Отправляем…
                        </>
                      ) : (
                        <>
                          <CalendarCheck className="size-5" />
                          Записаться на приём
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Нажимая кнопку, вы соглашаетесь с{" "}
                      <a href="/privacy" className="underline hover:text-accent">
                        политикой конфиденциальности
                      </a>
                      .
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor} className="flex items-center gap-1.5">
        {label}
        {optional && (
          <span className="text-xs font-normal text-muted-foreground">
            — необязательно
          </span>
        )}
      </Label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-danger"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full min-h-[420px] flex-col items-center justify-center gap-6 text-center"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="grid size-20 place-items-center rounded-full bg-success/12 text-success"
      >
        <motion.span
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Check className="size-10" strokeWidth={3} />
        </motion.span>
      </motion.span>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold">Заявка принята!</h3>
        <p className="max-w-xs text-muted-foreground">
          Мы перезвоним вам в течение 15 минут, чтобы подтвердить запись.
          Спасибо за доверие.
        </p>
      </div>
      <Button variant="outline" onClick={onReset}>
        Отправить ещё одну заявку
      </Button>
    </motion.div>
  );
}
