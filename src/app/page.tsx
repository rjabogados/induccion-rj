import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "~/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 text-zinc-900">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Image src="/logo_completo.png" alt="RJ Abogados" width={400} height={120} className="mb-4" />
        <p className="text-2xl text-center">
          Plataforma de Inducción Corporativa
        </p>
        <Link href="/login" className={buttonVariants({ size: "lg" })}>
          Ingresar
        </Link>
      </div>
    </main>
  );
}
