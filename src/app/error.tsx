"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-3xl font-bold">Что-то пошло не так</h1>
      <p className="max-w-md text-muted-foreground">
        Мы уже разбираемся. Попробуйте обновить страницу или свяжитесь с нами по
        телефону.
      </p>
      <Button onClick={reset}>Обновить</Button>
    </div>
  );
}
