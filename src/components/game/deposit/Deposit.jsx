import { useMutation } from "@tanstack/react-query";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useState } from "react";
import { deposit } from "../../../api/deposit";
import { requestNewPurchase } from "../../../api/purchase";
import image from "../../../assets";
import { ConfigKey } from "../../../constants/enum";
import useHealthAuth from "../../../utils/hooks/useHealthAuth";
import useMetadata from "../../../utils/hooks/useMetadata";
import useProfile from "../../../utils/hooks/useProfile";

function Deposit({ isOpen, setOpen }) {
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress();
  const { refetchProfile } = useProfile(true);
  const { metadata } = useMetadata(true);
  const {} = useHealthAuth();
  const [inputValue, setInputValue] = useState(0.1);
  const minTonDeposit = Number(metadata?.[ConfigKey.MIN_TON_DEPOSIT]?.value);

  const depositMutation = useMutation({
    mutationFn: (params) => deposit(params),
  });

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (/^\d*(\.\d{0,9})?$/.test(value)) {
      setInputValue(value);
    }
  };

  const closePopup = () => {
    setOpen(false);
  };

  const onLickDeposit = async () => {
    try {
      const newPurchase = await requestNewPurchase({
        type: "DEPOSIT",
        walletAddress: userFriendlyAddress,
        ton: inputValue,
      });
      const idCell = newPurchase?.data?.idCell;
      if (idCell) {
        const address = metadata?.[ConfigKey.WALLET_ADDRESS_ENDPOINT]?.value;
        const transaction = {
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
          messages: [
            {
              address,
              amount: inputValue * 1e9,
              payload: idCell,
            },
          ],
        };
        const { boc } = await tonConnectUI.sendTransaction(transaction);
        depositMutation.mutate(
          {
            transactionId: boc,
            walletAddress: userFriendlyAddress,
            ton: inputValue,
          },
          {
            onSuccess: async (data) => {
              if (data) {
                setTimeout(() => {
                  refetchProfile();
                }, 15000);
                closePopup();
              }
            },
            onError: () => {},
          }
        );
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const isDisabled = depositMutation.isPending || inputValue < minTonDeposit;
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

            <div className="w-full mt-4 mb-4">
              <label
                htmlFor="numberInput"
                className="block text-white mb-2 font-montserrat text-[16px] font-bold leading-[19.5px] text-center"
              >
                Deposit ton (Min:{" "}
                <span className="text-[#FF2D2D]">{minTonDeposit}</span>)
              </label>
              <input
                value={inputValue}
                onChange={handleInputChange}
                id="numberInput"
                type="number"
                placeholder="Enter the number of tons"
                className="w-full px-4 py-2 border border-gray-300 rounded-[8px] text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-center w-full">
              <button
                onClick={onLickDeposit}
                disabled={isDisabled}
                className={`${
                  isDisabled ? "cursor-not-allowed" : ""
                } shadow-[0px_2px_0px_0px_#226436] bg-[#0A9343] text-white px-4 py-2 w-[144px] h-[35px] top-[147px] left-[26px] p-[10px_12px] gap-[8px] rounded-[10px]`}
              >
                <span className="font-montserrat text-[16px] font-bold leading-[19.5px] text-center">
                  Deposit
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Deposit;
