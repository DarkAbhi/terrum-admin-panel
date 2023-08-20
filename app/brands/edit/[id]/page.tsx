import EditBrandForm from "@/components/brand/edit-brand-form";
import { DashboardHeader } from "@/components/header";
import { BASE_API_URL } from "@/constants/constants";
import { BRANDS_ENDPOINT } from "@/constants/routes";
import { getAccessTokenCookie } from "@/lib/session";
import { Brand } from "@/types/brand";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit brand",
};

export default async function EditBrand({
  params,
}: {
  params: { id: number };
}) {
  const apiResponse = await fetch(
    `${BASE_API_URL}${BRANDS_ENDPOINT}${params.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessTokenCookie()}`,
      },
    }
  );
  const brandResponse: Brand = await apiResponse.json();

  return (
    <div>
      <DashboardHeader heading="Edit brand"></DashboardHeader>
      <EditBrandForm brand={brandResponse} />
    </div>
  );
}
