import { sendGet } from "./axios";

export const healthAuth = () => sendGet("/api/health/auth");
