import image from "../../assets";

function PopUpResult({ isOpenWin, isOpenLose, isOpenDraw, money, setOpen }) {
  // Hàm để đóng modal
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="relative">
      {(isOpenWin || isOpenLose || isOpenDraw) && (
        <div className="fixed inset-0 flex justify-center items-center z-50 relative">
          <img
            src={isOpenWin || isOpenDraw ? image.winGame : image.loseGame}
            alt="you win"
            className="absolute top-[-33px] left-1/2 transform -translate-x-1/2 z-1"
          />
          <div
            className={`${
              isOpenWin || isOpenDraw
                ? "border-[#0A9343] shadow-[0px_0px_10px_0px_#0A935780] justify-center"
                : "border-[#9F9F9F] shadow-[0px_0px_10px_0px_#FFFFFF80] justify-between"
            } backdrop-blur-[40px] border-2 border-solid bg-[#00000066] w-[195px] h-[196px] p-4 pt-[3rem] rounded-[16px] flex flex-col justify-center items-center`}
          >
            {(isOpenWin || isOpenLose) && (
              <p className="font-montserrat text-[14px] font-bold leading-[17.07px] text-center decoration-none">
                You have received
                <br />
                your opponent's
                <br />
                reward
              </p>
            )}
            {isOpenDraw && (
              <p className="font-montserrat text-[14px] font-bold leading-[17.07px] text-center decoration-none">
                The game ended in a draw.
                <br />
                Both players
                <br />
                keep their rewards.
              </p>
            )}

            {isOpenWin && (
              <div className="mt-[10px] mb-[10px] w-[121px] h-[37px] top-[99px] left-[38px] p-[4px_16px] gap-[4px] rounded-[8px] bg-black bg-opacity-50 flex justify-center items-center">
                <img
                  src={image.tonCoin}
                  alt="coin"
                  className="w-[24px] h-[24px] rounded-full object-cover"
                />
                <span className="font-montserrat text-[24px] font-bold leading-[29.26px] text-left">
                  {isOpenWin ? "+" : "-"}
                  {money}
                </span>
              </div>
            )}

            <div className="flex justify-center w-full">
              {/* <div className="w-[144px] h-[35px] top-[147px] left-[26px] p-[10px_12px] gap-[8px] rounded-[10px_0px_0px_0px] opacity-0"> */}
              <button
                onClick={closeModal}
                className="shadow-[0px_2px_0px_0px_#226436] bg-[#0A9343] text-white px-4 py-2 w-[144px] h-[35px] top-[147px] left-[26px] p-[10px_12px] gap-[8px] rounded-[10px]"
              >
                <span className="font-montserrat text-[16px] font-bold leading-[19.5px] text-center">
                  OK
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopUpResult;
