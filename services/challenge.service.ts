import { BASE_API_URL } from "@/constants/constants";
import { CHALLENGES_ENDPOINT } from "@/constants/routes";
import { fetchWrapper } from "@/helpers/fetch-wrapper";

export const challengeService = {
  createChallenge,
  deleteChallenge,
  editChallenge,
};

const BRANDS_URL = `${BASE_API_URL}${CHALLENGES_ENDPOINT}`;

async function createChallenge(
  name: string,
  description: string,
  startDate: string,
  endDate: string
) {
  return await fetchWrapper.post(`${BRANDS_URL}`, {
    name: name,
    description: description,
    start_date: startDate,
    end_date: endDate,
  });
}

async function editChallenge(
  id: number,
  name: string,
  description: string,
  startDate: string,
  endDate: string
) {
  return await fetchWrapper.put(`${BRANDS_URL}${id}/`, {
    name: name,
    description: description,
    start_date: startDate,
    end_date: endDate,
  });
}

async function deleteChallenge(id: number) {
  return await fetchWrapper.delete(`${BRANDS_URL}${id}/`, null);
}
