import { getAccessTokenCookie } from "@/lib/session";
import { BrandsTableShell } from "../brands-table-shell";

interface BrandsTableProps {
  url: string;
}

async function BrandsTable({ url }: BrandsTableProps) {
  const apiResponse = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessTokenCookie()}`,
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
