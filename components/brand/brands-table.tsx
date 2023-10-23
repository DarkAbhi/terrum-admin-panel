import { BrandsTableShell } from "./brands-table-shell";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

interface BrandsTableProps {
  url: string;
}

async function BrandsTable({ url }: BrandsTableProps) {
  const session = await getServerSession(authOptions);

  const apiResponse = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  const brands = await apiResponse.json();
  const pageCount = brands.total_pages;

  return (
    <div className="px-2 py-10">
      <BrandsTableShell data={brands.results} pageCount={pageCount} />
    </div>
  );
}

export default BrandsTable;
