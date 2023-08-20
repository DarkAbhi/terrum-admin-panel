import { BASE_API_URL } from "@/constants/constants";
import { BRANDS_ENDPOINT } from "@/constants/routes";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

export const brandService = {
  createBrand,
  getBrandsByPage,
  deleteBrand,
  editBrand,
};

const BRANDS_URL = `${BASE_API_URL}${BRANDS_ENDPOINT}`;

async function createBrand(name: string, website: string) {
  return await fetchWrapper.post(`${BRANDS_URL}`, {
    name,
    website,
  });
}

async function editBrand(id: number, name: string, website: string) {
  return await fetchWrapper.put(`${BRANDS_URL}${id}/`, {
    name,
    website,
  });
}

async function deleteBrand(id: number) {
  return await fetchWrapper.delete(`${BRANDS_URL}${id}/`, null);
}

async function getBrandsByPage() {
  return await fetchWrapper.get(`${BRANDS_URL}`, null);
}
