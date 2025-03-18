import { sendGet } from "./axios";

export const getProfile = () => sendGet("/api/v1/users/me");
