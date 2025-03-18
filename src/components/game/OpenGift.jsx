/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { playGameByTonAmount, updateViewDoneGame } from "../../api/turn";
import image from "../../assets";
import LoadingCircle from "../../commons/LoadingCircle/LoadingCircle";
import { ConfigKey } from "../../constants/enum";
import useHealthAuth from "../../utils/hooks/useHealthAuth";
import useMetadata from "../../utils/hooks/useMetadata";
import useProfile from "../../utils/hooks/useProfile";
import Histories from "./Histories/Histories";
import useDataTurnCurrentGame from "./hooks/useTurnCurrent";

function OpenGift({ sendMessage, isLoaded, started }) {
  // const userFriendlyAddress = useTonAddress();
  const { profile, refetchProfile } = useProfile();
  const { metadata } = useMetadata(true);
  const { refetchHealthAuth } = useHealthAuth();
  const [isSendMessage, setIsSendMessage] = useState(false);
  const [isToastVisible, setToastVisible] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const { dataTurnCurrentGame, refetchDataTurnCurrentGame } =
    useDataTurnCurrentGame(true);

  const playGameMutation = useMutation({
    mutationFn: () => playGameByTonAmount(),
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const valueTonPlay =
    metadata?.[ConfigKey.VALUE_NANOTONS_TRANSACTION]?.value * 1e-9;
  const historyRef = useRef(null);

  const onClickOpenGift = async () => {
    if (!profile?.isHasNft) {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      return;
    }
    setIsProcessing(true);
    await refetchHealthAuth();
    try {
      playGameMutation.mutate(
        {},
        {
          onSuccess: async (data) => {
            if (data) {
              const result = data.data;
              const params = {
                type: "join_game",
                data: result.details,
              };
              sendMessage(
                "Communication",
                "ReceiveMessage",
                JSON.stringify(params)
              );
              refetchProfile();
            }
          },
          onError: () => {},
          onSettled: () => {
            setIsProcessing(false);
          },
        }
      );
    } catch (error) {
      console.error("Transaction failed:", error);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!playGameMutation.isPending) {
        refetchDataTurnCurrentGame();
      }
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isLoaded || !started || !profile || isSendMessage) return;
    const details = dataTurnCurrentGame?.details?.filter((d) => !d.isViewDone);
    const gameView = dataTurnCurrentGame?.details?.find(
      (d) => !d.isViewDone && d?.userId === profile?.id
    );
    if (details?.length > 0) {
      const isExistUser = details.some((e) => e.userId === profile.id);
      if (!isExistUser) return;
      const params = {
        type: "join_game",
        data: details,
      };
      sendMessage("Communication", "ReceiveMessage", JSON.stringify(params));
      setTimeout(() => {
        setIsJoined(true);
      }, 2000);
    }
    if (
      dataTurnCurrentGame?.yourTurnNotViewDone &&
      (dataTurnCurrentGame?.winId || dataTurnCurrentGame?.winId === 0) &&
      isJoined
    ) {
      const valueTon = metadata?.[ConfigKey.VALUE_NANOTONS_WIN]?.value * 1e-9;
      const winId = dataTurnCurrentGame?.winId;

      if (gameView) {
        const params = {
          type: "result_game",
          data: {
            status: true,
            value_ton: 0,
            user_name: gameView.User.userName,
            avatar: gameView.User.photoUrl,
            turn_id: gameView.turnGameId,
          },
        };
        if (winId === profile.id) {
          params.data.result_game = "WIN";
          params.data.value_ton = valueTon;
          sendMessage(
            "Communication",
            "ReceiveMessage",
            JSON.stringify(params)
          );
          setIsSendMessage(true);
          updateViewDoneGame(dataTurnCurrentGame.id);
        }
        if (winId !== profile.id && winId !== 0) {
          params.data.result_game = "LOSE";
          sendMessage(
            "Communication",
            "ReceiveMessage",
            JSON.stringify(params)
          );
          setIsSendMessage(true);
          updateViewDoneGame(dataTurnCurrentGame.id);
        }
        if (winId === 0) {
          params.data.result_game = "DRAW";
          sendMessage(
            "Communication",
            "ReceiveMessage",
            JSON.stringify(params)
          );
          setIsSendMessage(true);
          updateViewDoneGame(dataTurnCurrentGame.id);
        }
      }
    }
  }, [
    dataTurnCurrentGame,
    isLoaded,
    started,
    profile,
    isSendMessage,
    isJoined,
  ]);

  const isDisabled =
    !!dataTurnCurrentGame?.yourTurn ||
    dataTurnCurrentGame?.yourTurnNotViewDone ||
    playGameMutation.isPending ||
    profile?.tonAmount < valueTonPlay ||
    isProcessing;
  return (
    <>
      <Histories ref={historyRef} />
      <div className="flex justify-center items-center absolute top-[120px] w-full px-4 translate-y-[-85%] z-[9]">
        {!isDisabled && (
          <div className="flex items-center gap-3 w-full">
            <button
              disabled={isDisabled}
              onClick={onClickOpenGift}
              className={`${
                isDisabled ? "cursor-not-allowed" : "active:scale-95"
              } relative z-2 flex justify-center items-center rounded-[99px] w-[211px] h-[44px] bg-[#E56E50] shadow-[0px_2px_0px_0px_#642E22] gap-[8px] transform transition-transform duration-200 w-full`}
            >
              <img
                src={image.tonCoin}
                alt="coin"
                className="w-[24px] h-[24px] rounded-full object-cover"
              />
              <p className="font-montserrat text-[16px] font-extrabold leading-[24px] tracking-[-0.02em] text-center decoration-none">
                {metadata?.[ConfigKey.VALUE_NANOTONS_TRANSACTION]?.value
                  ? metadata?.[ConfigKey.VALUE_NANOTONS_TRANSACTION]?.value *
                    1e-9
                  : 0}{" "}
                to open gift
              </p>
            </button>

            <button
              onClick={() => historyRef.current.onOpen()}
              className={`active:scale-95 relative z-2 flex justify-center items-center rounded-[99px] w-[120px] h-[44px] bg-[#E56E50] shadow-[0px_2px_0px_0px_#642E22] gap-[8px] transform transition-transform duration-200`}
            >
              <p className="font-montserrat text-[16px] font-extrabold leading-[24px] tracking-[-0.02em] text-center decoration-none">
                History
              </p>
            </button>
          </div>
        )}
      </div>
      {playGameMutation.isPending && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#00000066] z-50 overflow-hidden">
          <LoadingCircle />
        </div>
      )}
      {isToastVisible && (
        <div className="flex justify-center items-center fixed left-1/2 transform -translate-x-1/2 top-1 z-[99] bg-[red]  px-2 py-1 rounded-md shadow-md">
          <span className="font-bold leading-[20px] text-white text-[0.7rem] text-center">
            You need at least 1 NFT to open the gift.
          </span>
        </div>
      )}
    </>
  );
}

export default OpenGift;
