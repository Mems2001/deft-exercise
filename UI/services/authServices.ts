import { LoginPayload, LoginResponse, Router } from "../models/index";

export class AuthServices {
  static async login(payload: LoginPayload): Promise<LoginResponse> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    if (res.status === 200) Router.navigate('/console')
    return res.json() as Promise<LoginResponse>;
  }
};
