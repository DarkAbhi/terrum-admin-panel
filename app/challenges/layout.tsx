import { MainNav } from "@/components/main-nav";
import { dashboardConfig } from "@/config/dashboard";
import { SiteFooter } from "@/components/site-footer";
import { DashboardNav } from "@/components/dashboard-nav";
import { getUserLoggedIn } from "@/lib/session";
import { redirect } from "next/navigation";
import { UserAccountNav } from "@/components/user-account-nav";
import { ModeToggle } from "@/components/theme-toggle";

interface BrandsLayoutProps {
  children?: React.ReactNode;
}

export default async function BrandsLayout({ children }: BrandsLayoutProps) {
  const loggedIn = getUserLoggedIn();

  if (!loggedIn) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <div className="flex my-auto ml-auto gap-4">
            <ModeToggle />
            <UserAccountNav />
          </div>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  );
}