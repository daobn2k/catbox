import { useMutation } from "@tanstack/react-query";
import { useTonAddress } from "@tonconnect/ui-react";
import { buyNft, tonPriceInUsd } from "../../../api/nft";
import image from "../../../assets";
import { ConfigKey, TypeOpen } from "../../../constants/enum";
import { formatCurrency } from "../../../utils/utils";
import useNfts from "../hooks/useNfts";
import useMetadata from "../../../utils/hooks/useMetadata";
import useProfile from "../../../utils/hooks/useProfile";
import useHealthAuth from "../../../utils/hooks/useHealthAuth";
import { requestNewPurchase } from "../../../api/purchase";

function NftsCard({ isOpen, setOpen, tonConnectUI }) {
  const { profile, refetchProfile } = useProfile(true);
  const userFriendlyAddress = useTonAddress();
  const { dataNfts, refetchDataNfts } = useNfts(true);
  const { metadata } = useMetadata(true);
  const { refetchHealthAuth } = useHealthAuth();

  const closePopup = () => {
    setOpen(TypeOpen.battle);
  };
  const buyNftMutation = useMutation({
    mutationFn: ({ id, params }) => buyNft(id, params),
  });

  const handleBuyNft = async (id, ton) => {
    try {
      const newPurchase = await requestNewPurchase({
        type: "BUY_NFT",
        walletAddress: userFriendlyAddress,
        ton: ton,
        nftId: +id,
      });
      const idCell = newPurchase?.data?.idCell;

      if (idCell) {
        const address =
          metadata?.[ConfigKey.WALLET_ADDRESS_ENDPOINT_NFT]?.value;
        const transaction = {
          validUntil: Date.now() + 5 * 60 * 1000,
          messages: [
            {
              address,
              amount: ton * 1e9,
              payload: idCell,
            },
          ],
        };
        const { boc } = await tonConnectUI.sendTransaction(transaction);
        buyNftMutation.mutate(
          {
            id,
            params: {
              transactionId: boc,
              walletAddress: userFriendlyAddress,
            },
          },
          {
            onSuccess: async (data) => {
              await refetchDataNfts();
              if (data) {
                alert("Buy nft success");
              }
              setTimeout(() => {
                refetchProfile();
              }, 20000);
            },
            onError: (error) => {},
          }
        );
      }
    } catch (error) {
      console.error("Buy nft fail:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-40">
          <div className="backdrop-blur-[40px] border-2 border-solid bg-[#00000066] w-full h-[80%] mx-2.5 rounded-[16px] flex flex-col justify-between items-center pt-2 px-2">
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
            <div className="flex flex-col justify-end items-center box-content overflow-hidden">
              <div className="mb-2">
                <span className="font-montserrat text-[24px] font-black leading-[32px] text-center">
                  {dataNfts?.length} NFTs Card
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-4 gap-y-4 w-full overflow-y-auto max-h-[calc(80vh-85px)] scrollbar-hide pt-4">
                {dataNfts?.map((item) => {
                  const metadata = item.metadata;
                  const UserNftItems = item.UserNftItems;
                  return (
                    <div
                      key={item.id}
                      className={`${metadata?.classMain} relative mb-2 h-[249px] w-[164px] flex-none px-4 pt-5 pb-2 rounded-lg sm:w-full border-2 border-solid backdrop-blur-[40px] bg-opacity-20 flex flex-wrap justify-center gap-[0.4em]`}
                    >
                      <div
                        className={`${metadata?.bgColor} absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60px] h-[24px] p-[2px_8px] gap-[10px] rounded-[30px] flex justify-center`}
                      >
                        <span
                          className={`${metadata?.classColorText} flex justify-center items-center font-montserrat text-[0.8rem] font-bold text-ellipsis whitespace-nowrap overflow-hidden tooltip-parent`}
                          data-tooltip-target="tooltip-default"
                        >
                          {item.name}
                        </span>
                      </div>
                      <div className="flex justify-center gap-1">
                        <img
                          src={image.tonCoin}
                          alt="coin"
                          className="w-[24px] h-[24px] rounded-full object-cover"
                        />
                        <p className="font-montserrat text-[16px] font-extrabold leading-[24px] tracking-[-0.02em] text-center decoration-none">
                          {formatCurrency(item.ton)}
                        </p>
                        {/* <img
                          src={image.iconDolar}
                          alt="coin"
                          className="w-[24px] h-[24px] rounded-full object-cover"
                        /> */}
                      </div>

                      <div>
                        <img
                          src={item.imageUrl}
                          alt="coin"
                          className="w-[132px] h-[133px] object-cover"
                        />
                      </div>

                      <button
                        disabled={
                          !!UserNftItems?.length || buyNftMutation.isPending
                        }
                        className={`${metadata?.classButton} ${
                          !!UserNftItems?.length ? "cursor-not-allowed" : ""
                        } w-[144px] h-[35px] p-[10px_12px] gap-[8px] rounded-[10px] flex items-center justify-center transform transition-transform duration-200 active:scale-95`}
                        onClick={() => handleBuyNft(item.id, item.ton)}
                      >
                        <span
                          className={`${
                            metadata?.classColorText || ""
                          }  font-montserrat text-[16px] font-bold leading-[19.5px] text-left`}
                        >
                          BUY
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NftsCard;
