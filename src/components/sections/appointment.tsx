"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  const reducedMotion = useReducedMotion();

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
        <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            {/* Left — value proposition */}
            <div className="relative flex flex-col justify-between gap-10 border-b border-border bg-muted/35 p-8 sm:p-12 lg:border-b-0 lg:border-r">
              <div className="flex flex-col gap-4">
                <span className="meta-caps text-accent">
                  Запись на приём
                </span>
                <h2 className="text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
                  Первая консультация — бесплатно
                </h2>
                <p className="max-w-sm text-muted-foreground">
                  Оставьте заявку, и администратор перезвонит в течение 15 минут,
                  чтобы подтвердить удобное время.
                </p>
              </div>

              <ul className="flex flex-col border-y border-border">
                {[
                  { icon: ShieldCheck, text: "3D-диагностика и план лечения" },
                  { icon: CalendarCheck, text: "Удобное время без очередей" },
                  { icon: PhoneCall, text: "Ответ в течение 15 минут" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 border-b border-border py-4 text-sm last:border-b-0">
                    <span className="grid size-9 place-items-center rounded-xl border border-border text-accent">
                      <Icon className="size-5 stroke-[1.5]" />
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
                  <SuccessState
                    key="success"
                    onReset={() => setStatus("idle")}
                    reducedMotion={!!reducedMotion}
                  />
                ) : (
                  <motion.form
                    key="form"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="mx-auto flex max-w-2xl flex-col gap-5"
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

                    <div className="grid gap-5">
                      <Field label="Имя" error={errors.name?.message} htmlFor="name">
                        <Input
                          id="name"
                          placeholder="Как к вам обращаться"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
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
                          aria-describedby={errors.phone ? "phone-error" : undefined}
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
                            <SelectTrigger
                              id="service"
                              aria-invalid={!!errors.service}
                              aria-describedby={errors.service ? "service-error" : undefined}
                            >
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

                    <div className="grid gap-5">
                      <Field label="Дата" error={errors.date?.message} htmlFor="date">
                        <Input
                          id="date"
                          type="date"
                          min={today}
                          aria-invalid={!!errors.date}
                          aria-describedby={errors.date ? "date-error" : undefined}
                          {...register("date")}
                        />
                      </Field>

                      <Field label="Время" error={errors.time?.message} htmlFor="time">
                        <Controller
                          control={control}
                          name="time"
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger
                                id="time"
                                aria-invalid={!!errors.time}
                                aria-describedby={errors.time ? "time-error" : undefined}
                              >
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
                        aria-describedby={errors.comment ? "comment-error" : undefined}
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
                      data-magnetic="true"
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
  const reducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor} className="meta-caps flex items-center gap-1.5">
        {label}
        {optional && (
          <span className="text-[0.65rem] font-normal normal-case tracking-normal text-muted-foreground">
            — необязательно
          </span>
        )}
      </Label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${htmlFor}-error`}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            className="text-xs text-danger"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessState({
  onReset,
  reducedMotion,
}: {
  onReset: () => void;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full min-h-[420px] flex-col items-center justify-center gap-6 text-center"
    >
      <motion.span
        initial={reducedMotion ? { opacity: 0 } : { scale: 0 }}
        animate={reducedMotion ? { opacity: 1 } : { scale: 1 }}
        transition={
          reducedMotion
            ? { duration: 0.18 }
            : { type: "spring", stiffness: 200, damping: 15, delay: 0.1 }
        }
        className="grid size-20 place-items-center rounded-full bg-success/12 text-success"
      >
        <motion.span
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.4, delay: reducedMotion ? 0 : 0.3 }}
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
