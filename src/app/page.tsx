import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 text-zinc-900">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          RJ Induction Hub
        </h1>
        <p className="text-2xl text-center">
          Plataforma de Inducción Corporativa
        </p>
        <Button asChild size="lg">
          <Link href="/login">Ingresar</Link>
        </Button>
      </div>
    </main>
  );
}
