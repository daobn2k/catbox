import loadable from "@loadable/component";
import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { requestWithdraw } from "../../../api/battle";
import image from "../../../assets";
import { TypeOpen } from "../../../constants/enum";
import { useTonConnectUI } from "@tonconnect/ui-react";

const LeaderBoard = loadable(() => import("../leaderBoard/LeaderBoard"));
const Withdraw = loadable(() => import("../withdraw/Withdraw"));
const MyNftsCard = loadable(() => import("../myNftsCard/MyNftsCard"));
const NftsCard = loadable(() => import("../nftsCard/NftsCard"));

function Menu() {
  const [tonConnectUI] = useTonConnectUI();
  const [openType, setOpenType] = useState(TypeOpen.battle);

  const requestWithdrawMutation = useMutation({
    mutationFn: (params) => requestWithdraw(params),
  });

  const handleSetOpen = (currentType, itemType) => {
    if (currentType === itemType || itemType === TypeOpen.battle) {
      return TypeOpen.battle;
    }
    return itemType;
  };
  const actions = [
    {
      type: TypeOpen.leaderBoard,
      label: "rank",
      onClick: () => setOpenType(handleSetOpen(openType, TypeOpen.leaderBoard)),
      disable: false,
      image: image.rankGame,
    },
    {
      label: "withdraw",
      type: TypeOpen.withdraw,
      onClick: () => {
        setOpenType(handleSetOpen(openType, TypeOpen.withdraw));
      },
      className: requestWithdrawMutation.isPending ? "cursor-not-allowed" : "",
      disable: requestWithdrawMutation.isPending,
      image: image.withdraw,
    },
    {
      label: "battle",
      type: TypeOpen.battle,
      onClick: () => setOpenType(handleSetOpen(openType, TypeOpen.battle)),
      disable: false,
      image: image.battle,
    },
    {
      label: "nfts",
      type: TypeOpen.nftsCard,
      onClick: () => setOpenType(handleSetOpen(openType, TypeOpen.nftsCard)),
      disable: false,
      image: image.nft,
    },
    {
      label: "Inventory",
      type: TypeOpen.inventory,
      onClick: () => setOpenType(handleSetOpen(openType, TypeOpen.inventory)),
      disable: false,
      image: image.inventory,
    },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full z-50 text-white h-[20px] backdrop-blur-sm p-[12px] pb-[32px] gap-[12px] rounded-t-[24px] border-opacity-70 bg-gradient-to-t from-[#2B442F] to-[#18291A] border-t border-t-[#255F3D] shadow-[0_-4px_30px_0_#2A7F56]">
        <div className="flex justify-between absolute inset-0 pl-2 pr-2 top-0 left-0 right-0 transform -translate-y-[55%] gap-2 rounded-[24px] items-center">
          {actions.map((action) => (
            <div
              key={action.type}
              className={`flex-1 h-full items-center justify-center min-w-[10%]`}
            >
              <button
                disabled={action.disable}
                onClick={action.onClick}
                className={`flex flex-col items-center justify-center w-full h-full py-1 rounded-[24px] px-3
                  shadow-[0_0_12px_0_#58EBFF4D_inset,0_4px_8px_0_#00292F26] backdrop-blur-[20px]
                  [border-image-source:linear-gradient(278.96deg,rgba(255,214,145,0.3)_6.89%,rgba(236,159,106,0.3)_48.73%,rgba(212,89,56,0.3)_82.88%)]
                  [border-image-slice:1] bg-origin-border ${
                    action.type === openType
                      ? `bg-gradient-to-l from-[#EA845D] via-[#E56E50 ] to-[#D25335]`
                      : "bg-gradient-to-r from-[rgba(255,214,145,0.3)] via-[rgba(236,159,106,0.3)] to-[rgba(212,89,56,0.3)]"
                  }  ${action.className || ""} ${
                  action.type === TypeOpen.battle ? "min-h-[60px]" : ""
                }`}
              >
                <img
                  src={action.image}
                  alt="rank game"
                  className={`${
                    action.type === TypeOpen.withdraw ? "h-[30px]" : "h-[20px]"
                  } w-[20px] object-cover`}
                />
                <span className="w-full text-[0.6rem] sm:text-xs md:text-base lg:text-lg xl:text-xl text-center truncate uppercase font-bold">
                  {action.label}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Hiển thị LeaderBoard chỉ khi openType là TypeOpen.leaderBoard */}
      {openType === TypeOpen.leaderBoard && (
        <LeaderBoard
          isOpen={openType === TypeOpen.leaderBoard}
          setOpen={setOpenType}
        />
      )}
      {openType === TypeOpen.nftsCard && (
        <NftsCard
          isOpen={openType === TypeOpen.nftsCard}
          setOpen={setOpenType}
          tonConnectUI={tonConnectUI}
        />
      )}
      {openType === TypeOpen.inventory && (
        <MyNftsCard
          isOpen={openType === TypeOpen.inventory}
          setOpen={setOpenType}
        />
      )}
      {openType === TypeOpen.withdraw && (
        <Withdraw
          isOpen={openType === TypeOpen.withdraw}
          setOpen={setOpenType}
          requestWithdrawMutation={requestWithdrawMutation}
        />
      )}
    </>
  );
}

export default Menu;
