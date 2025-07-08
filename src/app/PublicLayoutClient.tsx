"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { ReactNode } from "react";

function PublicHeader() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-background text-foreground dark:bg-background dark:text-foreground shadow sticky top-0 z-30">
      <Link href="/" className="text-2xl font-bold text-primary">WorkingNow</Link>
      <nav className="flex items-center gap-2">
        <ThemeToggle />
      </nav>
    </header>
  );
}

export default function PublicLayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showHeader = pathname === "/" || pathname.startsWith("/login") || pathname.startsWith("/signup");
  return (
    <>
      {showHeader && <PublicHeader />}
      <main className={showHeader ? "flex flex-col min-h-[calc(100vh-64px)]" : "flex flex-col min-h-screen"}>{children}</main>
    </>
  );
} 