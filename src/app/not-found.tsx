import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[80vh] flex-col items-center justify-center gap-6 text-center">
      <p className="text-7xl font-bold text-gradient">404</p>
      <h1 className="text-2xl font-bold">Страница не найдена</h1>
      <p className="max-w-md text-muted-foreground">
        Возможно, ссылка устарела или страница была перемещена.
      </p>
      <Button asChild>
        <Link href="/">На главную</Link>
      </Button>
    </div>
  );
}
