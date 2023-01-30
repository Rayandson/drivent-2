import { RequestError } from "@/protocols";

export function requestError(status: number, statusText: string): RequestError {
  return {
    name: "RequestError",
    data: null,
    status,
    statusText,
    message: "No result for this search!",
  };
}

export function badRequestError(status: number, statusText: string): RequestError {
  return {
    name: "BadRequestError",
    data: null,
    status,
    statusText,
    message: "ticketId is missing!",
  };
}