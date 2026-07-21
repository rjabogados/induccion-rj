import Link from 'next/link'

export function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 text-zinc-100 flex-shrink-0 h-full flex flex-col">
      <div className="p-4 font-bold text-lg border-b border-zinc-800">
        RJ Induction Hub
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/dashboard" className="block px-4 py-2 rounded hover:bg-zinc-800 transition-colors">Dashboard</Link>
        <Link href="/colaboradores" className="block px-4 py-2 rounded hover:bg-zinc-800 transition-colors">Colaboradores</Link>
        <Link href="/inducciones" className="block px-4 py-2 rounded hover:bg-zinc-800 transition-colors">Inducciones</Link>
        <Link href="/cursos" className="block px-4 py-2 rounded hover:bg-zinc-800 transition-colors">Cursos</Link>
        <Link href="/evaluaciones" className="block px-4 py-2 rounded hover:bg-zinc-800 transition-colors">Evaluaciones</Link>
        <Link href="/reportes" className="block px-4 py-2 rounded hover:bg-zinc-800 transition-colors">Reportes</Link>
      </nav>
    </aside>
  )
}
