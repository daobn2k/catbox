import { sendGet } from "./axios";

export const getLinkReferral = () => sendGet("/api/v1/referral/link");
