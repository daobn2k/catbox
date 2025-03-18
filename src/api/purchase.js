import { sendPost } from "./axios";

export const requestNewPurchase = (params) =>
  sendPost(`/api/v1/purchases`, params);
