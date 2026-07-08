import { Phone, Mail, MapPin } from "lucide-react";

import { NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground text-sm font-bold">
                L
              </span>
              <span className="text-lg font-bold">{SITE.name}</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Премиальная стоматология полного цикла. Здоровье и эстетика улыбки,
              которым доверяют.
            </p>
            <div className="flex flex-wrap gap-2">
              {SITE.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Разделы">
            <h3 className="text-sm font-semibold">Навигация</h3>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">Контакты</h3>
            <a
              href={SITE.phoneHref}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <Phone className="size-4" /> {SITE.phone}
            </a>
            <a
              href={SITE.emailHref}
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <Mail className="size-4" /> {SITE.email}
            </a>
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0" /> {SITE.address}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">Часы работы</h3>
            {SITE.hours.map((h) => (
              <div
                key={h.day}
                className="flex items-center justify-between text-sm text-muted-foreground"
              >
                <span>{h.day}</span>
                <span className="font-medium text-foreground">{h.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {year} {SITE.legalName}. Все права защищены.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="transition-colors hover:text-accent">
              Политика конфиденциальности
            </a>
            <a href="/terms" className="transition-colors hover:text-accent">
              Пользовательское соглашение
            </a>
          </div>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground/70">
          Имеются противопоказания. Необходима консультация специалиста.
          Лицензия № ЛО-00-000000 от 01.01.2020.
        </p>
      </div>
    </footer>
  );
}
