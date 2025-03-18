import { TonConnectButton } from "@tonconnect/ui-react";
import { useState } from "react";
import image from "../../assets";
import useGetLinkReferral from "../../utils/hooks/useGetLinkReferral";
import useProfile from "../../utils/hooks/useProfile";
import { roundToNineDecimalPlaces } from "../../utils/utils";
import Deposit from "./deposit/Deposit";
import Menu from "./menu/Menu";

export default function Wrapper({ children }) {
  const [isToastVisible, setToastVisible] = useState(false);
  const [isOpenDeposit, setIsDeposit] = useState(false);

  const { linkReferral } = useGetLinkReferral(true);
  const { profile } = useProfile(true);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(linkReferral?.referralLink)
      .then(() => {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 1000);
      })
      .catch(() => {
        const textarea = document.createElement("textarea");
        textarea.value = linkReferral?.referralLink;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          setToastVisible(true);
          setTimeout(() => setToastVisible(false), 1000);
        } catch {
          console.error("Failed to copy the link.");
        } finally {
          document.body.removeChild(textarea);
        }
      });
  };
  return (
    <>
      {isToastVisible && (
        <div className="flex justify-center items-center fixed left-1/2 transform -translate-x-1/2 top-1 z-[99] bg-[#007140]  px-2 py-1 rounded-md shadow-md">
          <img
            src={image.done}
            alt="coin"
            className="w-[24px] h-[24px] rounded-full object-cover"
          />
          <span className="font-bold leading-[20px] text-white text-[0.7rem] text-center">
            Referral link copied to clipboard!
          </span>
        </div>
      )}
      <div className="flex justify-center items-center absolute left-1/2 transform -translate-x-1/2 top-6 w-min gap-2 z-[999]">
        <div
          className={`flex justify-center items-center z-50 
    w-[40px] h-[40px] p-[8px] gap-[8px] rounded-[50px] border-[1px]
    bg-gradient-to-l from-[#EA845D] via-[#E56E50 ] to-[#D25335] cursor-pointer`}
          onClick={handleCopy}
          title={linkReferral?.referralLink}
        >
          <img
            src={image.copy}
            alt="coin"
            className="w-[24px] h-[24px] rounded-full object-cover flex-shrink-0"
          />
        </div>

        <TonConnectButton
          className="flex justify-center items-center top-1 w-min"
          style={{ width: "min-content" }}
        />

        <div
          className={`z-50 flex justify-center items-center
    w-[110px] h-[40px] p-[8px_16px_8px_8px] gap-[8px] rounded-[50px] border-[1px]
    bg-gradient-to-l from-[#EA845D] via-[#E56E50 ] to-[#D25335]
  `}
        >
          <img
            src={image.tonCoin}
            alt="coin"
            className="w-[24px] h-[24px] rounded-full object-cover"
          />
          <span className="text-[0.8rem] font-bold leading-[20px]">
            {roundToNineDecimalPlaces(profile?.tonAmount)}
          </span>
        </div>

        <div
          className={`flex justify-center items-center z-50 
    w-[40px] h-[40px] p-[8px] gap-[8px] rounded-[50px] border-[1px]
    bg-gradient-to-l from-[#EA845D] via-[#E56E50 ] to-[#D25335] cursor-pointer`}
          title={"Add ton play game"}
          onClick={() => setIsDeposit(true)}
        >
          <img
            src={image.plus}
            alt="coin"
            className="w-[24px] h-[24px] rounded-full object-cover flex-shrink-0"
          />
        </div>
      </div>
      {children}
      <Menu />
      {isOpenDeposit && (
        <Deposit isOpen={isOpenDeposit} setOpen={setIsDeposit}></Deposit>
      )}
    </>
  );
}
