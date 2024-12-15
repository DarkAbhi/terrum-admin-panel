/**
 * DashboardCards component fetches data from an API endpoint and displays card-based navigation links on the dashboard.
 * It fetches information such as the total number of brands and users from the API response and renders them as cards.
 *
 * @returns {JSX.Element} - A React JSX element representing the dashboard cards.
 */
import {Card, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {BASE_API_URL} from "@/constants/constants";
import {getServerSession} from "next-auth/next";
import Link from "next/link";
import {authOptions} from "@/app/(app)/api/auth/[...nextauth]/options";

export default async function DashboardCards() {
    const session = await getServerSession(authOptions);

    // Fetch data from the API endpoint for the dashboard cards.
    const apiResponse = await fetch(`${BASE_API_URL}/staff/dashboard-home`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
        },
    });

    // Parse the API response as JSON.
    const dashboardCardsResponse = await apiResponse.json();

    return (
        // Render a grid of card-based navigation links.
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
            {/* Create a link to the "Users" page */}
            <Link href="/admin/users">
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
            <Card>
                <CardHeader>
                    <CardTitle>Communities</CardTitle>
                    {/* Display the total number of communities */}
                    <CardDescription>
                        Total: {dashboardCardsResponse.communities}
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
