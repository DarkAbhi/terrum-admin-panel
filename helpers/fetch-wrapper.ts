import { BASE_API_URL } from "@/constants/constants";
import { authService } from "@/services/auth.service";
import Cookies from "js-cookie";

type JSONValue =
  | boolean
  | number
  | string
  | null
  | readonly JSONValue[]
  | { readonly [key: string]: JSONValue };

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
  patch: request("PATCH"),
};

function request(method: string) {
  return async (url: string, body: JSONValue) => {
    const requestHeaders = authHeader(url);
    requestHeaders.append("Content-Type", "application/json");
    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };
    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    try {
      const response = await fetch(url, requestOptions);
      return handleResponse(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

// helper functions

function authHeader(url: string) {
  // return auth header with jwt if user is logged in and request is to the api url
  const isLoggedIn = true ? Cookies.get("access_token") : false;
  const isApiUrl = url.startsWith(BASE_API_URL);
  let headers: HeadersInit = new Headers();
  if (isLoggedIn && isApiUrl) {
    headers.append("Authorization", `Bearer ${Cookies.get("access_token")}`);
  }
  return headers;
}

async function handleResponse(response: Response) {
  const isJson = response.headers
    ?.get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : null;

  // check for error response
  if (!response.ok) {
    if ([401, 403].includes(response.status)) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      authService.logout();
    }
  }
  return data;
}
