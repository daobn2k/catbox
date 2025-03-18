import { sendGet, sendPost } from "./axios";

export const nfts = () => sendGet(`/api/v1/nfts`);
export const buyNft = (id, params) => sendPost(`/api/v1/nfts/${id}/buy`, params);
export const myNft = () => sendGet(`/api/v1/nfts/my-nfts`);
export const tonPriceInUsd = () => sendGet(`/api/v1/nfts/ton-price-in-usd`);
