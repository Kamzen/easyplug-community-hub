import { api } from "@/lib/api";

// AuthService: Handles authentication-related API calls

// Login: Sends login credentials and returns token and optional message
async function login(payload) {
  const { data } = await api.post("/auth/login", payload);
  const token = data?.token ?? data?.data?.token;
  const message = data?.message ?? data?.data?.message;
  if (!token) {
    throw new Error("Login response missing token");
  }
  return { token, message };
}

// Register: Sends registration data and returns user and optional token
async function register(payload) {
  const { data } = await api.post("/auth/register", payload);
  return data.data;
}

// GetUserInfo: Fetches the authenticated user's info
async function getUserInfo() {
  const { data } = await api.get("/auth/me");
  const maybeObj = data;
  let candidate;
  if (maybeObj && typeof maybeObj === "object" && "user" in maybeObj) {
    candidate = maybeObj.user;
  } else if (maybeObj && typeof maybeObj === "object" && "data" in maybeObj) {
    candidate = maybeObj.data;
  } else {
    candidate = data;
  }
  if (!candidate) throw new Error("/auth/me response missing user");
  return candidate;
}

export const authService = {
  login,
  register,
  getUserInfo,
};
