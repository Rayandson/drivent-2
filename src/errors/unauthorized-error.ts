import { RequestError } from "@/protocols";

export function unauthorizedError(status: number, statusText: string): RequestError {
  return {
    name: "UnauthorizedError",
    data: null,
    status,
    statusText,
    message: "Unauthorized",
  };
}
