import { sendGet, sendPost, sendPatch } from "./axios";

export const getTurnCurrent = () => sendGet("/api/v1/turn-games");
export const playGame = (params) => sendPost("/api/v1/turn-games", params);
export const updateViewDoneGame = (turnGameId) =>
  sendPatch(`/api/v1/turn-games/view-done/${turnGameId}`);
export const leaderBoard = () =>
  sendGet(`/api/v1/turn-games/leader-board-by-user`);
export const metadata = () => sendGet(`/api/v1/turn-games/metadata`);
export const history = (params) =>
  sendGet("/api/v1/turn-games/history", params);
export const playGameByTonAmount = () =>
  sendPost("/api/v1/turn-games/by-ton-amount");
