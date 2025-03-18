import image from "../../../assets";
import { TypeOpen } from "../../../constants/enum";
import useLeaderBoard from "../hooks/useLeaderBoard";

function LeaderBoard({ isOpen, setOpen }) {
  const { dataLeaderBoard } = useLeaderBoard(true);

  const imagesRanks = [
    image.rank1,
    image.rank2,
    image.rank3,
    image.rank4,
    image.rank5,
  ];

  const closePopup = () => {
    setOpen(TypeOpen.battle);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-40">
          <div className="backdrop-blur-[40px] border-2 border-solid bg-[#00000066] w-[280px] h-[320px] rounded-[16px] flex flex-col justify-start items-center py-2 px-2">
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
                <span className="font-montserrat text-[16px] font-bold leading-[19.5px] text-center">
                  YOU /{" "}
                  <span className="text-[#FF2D2D]">
                    {dataLeaderBoard?.you?.pointCurrent}
                  </span>
                </span>
              </div>
              <div className="space-y-4">
                {/* Thêm khoảng cách giữa các mục trong danh sách */}
                {dataLeaderBoard?.enrichedTopUsers?.map((item, index) => (
                  <div key={item?.userId} className="flex items-center gap-2">
                    <img
                      src={imagesRanks[index]}
                      alt="avatar"
                      className="w-[24px] h-[24px] rounded-full object-cover"
                    />
                    <img
                      src={item?.photoUrl}
                      alt="avatar"
                      className="w-[24px] h-[24px] rounded-full object-cover"
                    />
                    <span className="font-montserrat text-[16px] font-bold leading-[19.5px] text-center">
                      {item?.userName} /{" "}
                      <span className="text-[#FF2D2D]">
                        {" "}
                        {item?.pointCurrent}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LeaderBoard;
