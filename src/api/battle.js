import { sendPost } from "./axios";

export const requestWithdraw = (params) =>
  sendPost(`/api/v1/battle/request`, params);
