import { BASE_API_URL } from "@/constants/constants";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { redirect } from "next/navigation";

export const authService = {
  login,
  logout,
};

async function login(email: string, password: string) {
  return await fetchWrapper.post(`${BASE_API_URL}/staff-login`, {
    email,
    password,
  });
}

function logout() {
  // remove user from local storage
  // localStorage.removeItem("user");
  // Cookies.remove("access_token");
  redirect("/");
}
