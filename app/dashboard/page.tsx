import { BASE_API_URL } from "@/api/constants";
import { brandTableColumns } from "@/components/brand/columns";
import { DataTable } from "@/components/brand/data-table";
import CreateButton from "@/components/create-button";
import { DashboardHeader } from "@/components/header";
import { getAccessTokenCookie } from "@/lib/session";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Terrum Dashboard",
};

export default async function DashboardPage() {

  const apiResponse = await fetch(`${BASE_API_URL}/staff/brand/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessTokenCookie()}`,
    },
  });
  const brands = await apiResponse.json()

  return (
    <div>
      <DashboardHeader heading="Brands" text="Create and manage brands">
        <CreateButton text="Add brand" route="dashboard/create" />
      </DashboardHeader>
      <div className="px-2 py-10">
        <DataTable columns={brandTableColumns} data={brands} />
      </div>
    </div>
  );
}
