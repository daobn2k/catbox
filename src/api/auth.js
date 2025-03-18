import { sendPost } from "./axios";

export const v1AuthTelegram = (payload) =>
  sendPost("api/v1/auth/telegram", payload);
