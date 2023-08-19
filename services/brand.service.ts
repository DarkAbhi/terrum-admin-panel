import { BASE_API_URL } from "@/constants/constants";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

export const brandService = {
  createBrand,
  getBrandsByPage,
  deleteBrand,
};

async function createBrand(name: string, website: string) {
  return await fetchWrapper.post(`${BASE_API_URL}/staff/brand/`, {
    name,
    website,
  });
}

async function deleteBrand(id: number) {
  return await fetchWrapper.delete(`${BASE_API_URL}/staff/brand/${id}/`, null);
}

async function getBrandsByPage() {
  return await fetchWrapper.get(`${BASE_API_URL}/staff/brand/`, null);
}
