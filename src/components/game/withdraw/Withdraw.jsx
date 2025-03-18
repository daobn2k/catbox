import { useTonAddress } from "@tonconnect/ui-react";
import image from "../../../assets";
import { ConfigKey, TypeOpen } from "../../../constants/enum";
import User from "../User";
import { roundToNineDecimalPlaces } from "../../../utils/utils";
import useProfile from "../../../utils/hooks/useProfile";
import useMetadata from "../../../utils/hooks/useMetadata";

function Withdraw({ isOpen, setOpen, requestWithdrawMutation }) {
  const { profile, refetchProfile } = useProfile(true);
  const { metadata } = useMetadata(true);

  const userFriendlyAddress = useTonAddress();
  const closePopup = () => {
    setOpen(TypeOpen.battle);
  };

  const handleRequestWithdraw = async () => {
    if (userFriendlyAddress) {
      requestWithdrawMutation.mutate(
        { walletAddress: userFriendlyAddress },
        {
          onSuccess: async (data) => {
            if (data) {
              refetchProfile();
              setOpen(null);
              alert(`Reuqest withdraw succes`);
            }
          },
          onError: (error) => {
            alert(`Reuqest withdraw fail`);
          },
        }
      );
    }
  };

  // const pointCurrent = profile?.pointCurrent;
  // const percentWithdraw = metadata?.[ConfigKey.PERCENT_WITHDRAW]?.value;
  // const tonPointCurrent = Number(percentWithdraw / 100) * pointCurrent;
  // const pointToTon = roundToNineDecimalPlaces(tonPointCurrent);
  const minTonWithDraw = metadata?.[ConfigKey.MIN_TON_WITHDRAW]?.value;
  const feeTonWithdraw = metadata?.[ConfigKey.FEE_TON_WITHDRAW]?.value;
  const tonInvite = roundToNineDecimalPlaces(profile?.tonInvite);
  const tonAmount = roundToNineDecimalPlaces(profile?.tonAmount);
  // const totalTon = roundToNineDecimalPlaces(tonInvite + value + tonAmount);
  const totalTon = roundToNineDecimalPlaces(tonInvite + tonAmount);
  const tonWithdraw = roundToNineDecimalPlaces(totalTon - feeTonWithdraw);
  const isDisabled =
    requestWithdrawMutation.isPending || totalTon < minTonWithDraw;
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-40">
          <div className="backdrop-blur-[40px] border-2 border-solid bg-[#00000066]  w-[280px] mx-2.5 rounded-[16px] flex flex-col justify-around items-center p-2">
            <div
              className="flex justify-end w-full cursor-pointer"
              onClick={closePopup}
            >
              <img
                src={image.quitAll}
                alt="coin"
                className="w-[30px] h-[30px] object-cover"
              />
            </div>
            <div className="flex flex-col justify-end items-center">
              <div className="mb-4">
                <User
                  ava={profile?.photoUrl}
                  name={
                    profile?.userName ||
                    `${profile?.firstName} ${profile?.lastName}`
                  }
                />
              </div>
              {/* <div className="">
                <span className="font-montserrat text-[16px] font-bold leading-[19.5px] text-center">
                  <span className="mr-2">Point current</span>
                  <span className="mr-2">=</span>
                  <span className="text-[#FF2D2D]">{pointCurrent}</span>
                </span>
              </div>
              <div className="">
                <span className="font-montserrat text-[16px] font-bold leading-[19.5px] text-center">
                  <span className="mr-2">Ton percent withdraw</span>
                  <span className="mr-2">=</span>
                  <span className="text-[#FF2D2D]">{percentWithdraw} %</span>
                </span>
              </div>
              <div className="">
                <span className="font-montserrat text-[16px] font-bold leading-[19.5px] text-center">
                  <span className="mr-2">Point to ton</span>
                  <span className="mr-2">=</span>
                  <span className="text-[#FF2D2D]">{pointToTon}</span>
                </span>
              </div> */}

              <div className="">
                <span className="font-montserrat text-[16px] font-bold leading-[19.5px] text-center">
                  <span className="mr-2">Ton invite</span>
                  <span className="mr-2">=</span>
                  <span className="text-[#FF2D2D]">{tonInvite}</span>
                </span>
              </div>

              <div className="">
                <span className="font-montserrat text-[16px] font-bold leading-[19.5px] text-center">
                  <span className="mr-2">Ton amount</span>
                  <span className="mr-2">=</span>
                  <span className="text-[#FF2D2D]">{tonAmount}</span>
                </span>
              </div>

              <div className="mb-4">
                <span className="font-montserrat text-[16px] font-bold leading-[19.5px] text-center">
                  <span className="mr-2">Total ton</span>
                  <span className="mr-2">=</span>
                  <span className="text-[#FF2D2D]">{totalTon}</span>
                </span>
              </div>
              <div className="">
                <span className="font-montserrat text-[16px] font-bold leading-[19.5px] text-center">
                  <span className="mr-2">Min / Fee</span>
                  <span className="mr-2">=</span>
                  <span className="text-[#FF2D2D]">
                    {minTonWithDraw} / {feeTonWithdraw}
                  </span>
                </span>
              </div>
              <div className="mb-4">
                <span className="font-montserrat text-[16px] font-bold leading-[19.5px] text-center">
                  <span className="mr-2">Ton withdraw</span>
                  <span className="mr-2">=</span>
                  <span className="text-[#FF2D2D]">
                    {tonWithdraw < 0 ? 0 : tonWithdraw}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex justify-center w-full">
              {/* <div className="w-[144px] h-[35px] top-[147px] left-[26px] p-[10px_12px] gap-[8px] rounded-[10px_0px_0px_0px] opacity-0"> */}
              <button
                onClick={handleRequestWithdraw}
                disabled={isDisabled}
                className={`${
                  isDisabled ? "cursor-not-allowed" : ""
                } shadow-[0px_2px_0px_0px_#226436] bg-[#0A9343] text-white px-4 py-2 w-[144px] h-[35px] top-[147px] left-[26px] p-[10px_12px] gap-[8px] rounded-[10px]`}
              >
                <span className="font-montserrat text-[16px] font-bold leading-[19.5px] text-center">
                  Withdraw
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Withdraw;
