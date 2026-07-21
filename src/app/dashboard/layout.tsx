import { Sidebar } from "~/components/layout/Sidebar"
import { TopNav } from "~/components/layout/TopNav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-zinc-50 overflow-hidden text-zinc-900">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
