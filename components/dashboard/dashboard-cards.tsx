import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BASE_API_URL } from "@/constants/constants";
import { getAccessTokenCookie } from "@/lib/session";
import Link from "next/link";

export default async function DashboardCards() {
  const apiResponse = await fetch(`${BASE_API_URL}/staff/dashboard-home`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessTokenCookie()}`,
    },
  });
  const dashboardCardsResponse = await apiResponse.json();
  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-5">
      <Link href="/brands">
        <Card>
          <CardHeader>
            <CardTitle>Brands</CardTitle>
            <CardDescription>
              Total: {dashboardCardsResponse.brands}
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}
