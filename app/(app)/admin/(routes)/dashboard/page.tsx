import DashboardCards from "@/components/dashboard/dashboard-cards";
import DashboardLoadingSkeleton from "@/components/dashboard/dashboard-loading";
import {DashboardHeader} from "@/components/header";
import {Metadata} from "next";
import {Suspense} from "react";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Terrum Dashboard",
};

export default async function DashboardPage() {
    return (
        <div>
            <DashboardHeader heading="Dashboard" text="Admin Panel"/>
            <Suspense fallback={<DashboardLoadingSkeleton/>}>
                <DashboardCards/>
            </Suspense>
        </div>
    );
}
