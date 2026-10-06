export interface LoginResponse {
  token: string;
  /** Token lifetime in seconds. */
  expiresIn: number;
}
