import { api, type ApiResponse } from "@/lib/api";

export type AuthUser = {
  id: string | number;
  name: string;
  email: string;
  role?: string;
};

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  userType?: string;
};

export const authService = {
  async login(
    payload: LoginPayload
  ): Promise<{ token: string; message?: string }> {
    // Some backends return { success, token } directly, others wrap in { data: { token } }
    const { data } = await api.post("/auth/login", payload);
    const token: string | undefined = data?.token ?? data?.data?.token;
    const message: string | undefined = data?.message ?? data?.data?.message;
    if (!token) {
      throw new Error("Login response missing token");
    }
    return { token, message };
  },
  async register(payload: RegisterPayload) {
    const { data } = await api.post<
      ApiResponse<{ user: AuthUser; token?: string }>
    >("/auth/register", payload);
    return data.data;
  },
  async getUserInfo() {
    type MeResponse =
      | { success?: boolean; user?: AuthUser }
      | { data?: AuthUser }
      | AuthUser;
    const { data } = await api.get<MeResponse>("/auth/me");
    const maybeObj = data as Record<string, unknown> | AuthUser;
    let candidate: AuthUser | undefined;
    if (maybeObj && typeof maybeObj === "object" && "user" in maybeObj) {
      candidate = (maybeObj as { user?: AuthUser }).user;
    } else if (maybeObj && typeof maybeObj === "object" && "data" in maybeObj) {
      candidate = (maybeObj as { data?: AuthUser }).data;
    } else {
      candidate = data as AuthUser;
    }
    if (!candidate) throw new Error("/auth/me response missing user");
    return candidate;
  }
};
