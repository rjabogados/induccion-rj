import { auth } from "~/server/auth"
import { Button } from "~/components/ui/button"
import Link from "next/link"

export async function TopNav() {
  const session = await auth();
  return (
    <header className="h-16 border-b flex items-center justify-between px-6 bg-white shrink-0">
      <div className="font-medium text-lg">
        Panel de Administración
      </div>
      <div className="flex items-center gap-4">
        {session?.user && (
          <span className="text-sm text-zinc-600">
            Rol: <span className="font-bold">{session.user.role}</span> | DNI: {session.user.dni}
          </span>
        )}
        <Button variant="outline" asChild>
          <Link href="/api/auth/signout">Salir</Link>
        </Button>
      </div>
    </header>
  )
}
