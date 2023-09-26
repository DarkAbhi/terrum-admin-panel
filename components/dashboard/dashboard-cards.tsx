/**
 * DashboardCards component fetches data from an API endpoint and displays card-based navigation links on the dashboard.
 * It fetches information such as the total number of brands and users from the API response and renders them as cards.
 *
 * @returns {JSX.Element} - A React JSX element representing the dashboard cards.
 */
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
  // Fetch data from the API endpoint for the dashboard cards.
  const apiResponse = await fetch(`${BASE_API_URL}/staff/dashboard-home`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessTokenCookie()}`,
    },
  });

  // Parse the API response as JSON.
  const dashboardCardsResponse = await apiResponse.json();

  return (
    // Render a grid of card-based navigation links.
    <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
      {/* Create a link to the "Brands" page */}
      <Link href="/brands">
        <Card>
          <CardHeader>
            <CardTitle>Brands</CardTitle>
            {/* Display the total number of brands */}
            <CardDescription>
              Total: {dashboardCardsResponse.brands}
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
      {/* Create a link to the "Users" page */}
      <Link href="/users">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            {/* Display the total number of users */}
            <CardDescription>
              Total: {dashboardCardsResponse.users}
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}
