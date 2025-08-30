import { LoginResponse, RegistrationFormValues } from "../models/index";

export class UsersServices {
  static async createUser(payload: RegistrationFormValues): Promise<LoginResponse> {
    try {
      const res = await fetch("/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json() as Promise<LoginResponse>
        throw new Error(`Error: ${(await err).message}`)
      }

      return res.json() as Promise<LoginResponse>
    } catch(error:any) {
      throw new Error(`HTTP error! error: ${error.message}`)
    }

  }
};