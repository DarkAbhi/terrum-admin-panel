import { BASE_API_URL } from "@/constants/constants";
import { DashboardHeader } from "@/components/header";
import { getAccessTokenCookie } from "@/lib/session";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Terrum Dashboard",
};

export default async function DashboardPage() {
  const apiResponse = await fetch(`${BASE_API_URL}/staff/dashboard-home`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessTokenCookie()}`,
    },
  });
  const homePageResponse = await apiResponse.json();

  return (
    <div>
      <DashboardHeader heading="Dashboard" text="Admin Panel" />
      <div className="mt-4 grid grid-cols-2 md:grid-cols-5">
        <Link href="/brands">
          <Card>
            <CardHeader>
              <CardTitle>Brands</CardTitle>
              <CardDescription>
                Total: {homePageResponse.brands}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
      <div className="px-2 py-10"></div>
    </div>
  );
}
