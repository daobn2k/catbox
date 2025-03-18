import { sendPost } from "./axios";

export const deposit = (params) => sendPost(`/api/v1/deposit`, params);
