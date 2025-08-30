interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
}