"use client";
import { usePathname } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/transactions", label: "Historique" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/import", label: "Import" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen md:flex md:gap-6 md:p-4">
      <aside className="hidden w-64 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-5 md:block">
        <div className="mb-6 text-xl font-semibold tracking-tight text-slate-100">
          FinanceApp
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <a
                key={link.href}
                className={`block rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "border border-blue-400/35 bg-blue-500/20 font-medium text-blue-100"
                    : "text-slate-300 hover:bg-[color:var(--surface-soft)] hover:text-slate-100"
                }`}
                href={link.href}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
