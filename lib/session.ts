import { cookies } from "next/headers"; // Import cookies

export function getUserLoggedIn() {
  const nextCookies = cookies(); // Get cookies object
  const token = nextCookies.get("access_token")?.value;
  return true ? token : false;
}

export function getAccessTokenCookie() {
  const nextCookies = cookies(); // Get cookies object
  const token = nextCookies.get("access_token")?.value;
  return token;
}
