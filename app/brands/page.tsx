import { BASE_API_URL } from "@/constants/constants";
import { BrandsTableShell } from "@/components/brands-table-shell";
import CreateButton from "@/components/create-button";
import { DashboardHeader } from "@/components/header";
import { getAccessTokenCookie } from "@/lib/session";
import { Metadata } from "next";
import { BRANDS_ENDPOINT } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Brands",
  description: "Brands",
};

interface IndexPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function BrandsPage({ searchParams }: IndexPageProps) {
  const { page, per_page, name } = searchParams;

  // Number of items per page
  const pageSize = typeof per_page === "string" ? parseInt(per_page) : 10;
  // Current page number
  const pageNumber = page === undefined ? 1 : page;

  let getAllBrandsUrl = `${BASE_API_URL}${BRANDS_ENDPOINT}?page=${pageNumber}&size=${pageSize}`;
  if (name !== null && name !== undefined) {
    getAllBrandsUrl = getAllBrandsUrl + `&name=${name}`;
  }

  const apiResponse = await fetch(getAllBrandsUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessTokenCookie()}`,
    },
  });
  const brands = await apiResponse.json();
  const pageCount = brands.total_pages;

  return (
    <div>
      <DashboardHeader heading="Brands" text="Create and manage brands">
        <CreateButton text="Add brand" route="brands/create" />
      </DashboardHeader>
      <div className="px-2 py-10">
        <BrandsTableShell data={brands.results} pageCount={pageCount} />
      </div>
    </div>
  );
}
