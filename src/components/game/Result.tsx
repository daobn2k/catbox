import image from "../../assets";
import User from "./User";
import LeaderBoard from "./leaderBoard/LeaderBoard";

function Result({ isVs, dataTurnCurrentGame, profile }) {
  const detailsTurnGame = dataTurnCurrentGame?.details;

  const play1 = detailsTurnGame?.[0];
  const play2 = detailsTurnGame?.[1];
  const play1ViewVs = profile.id === play1?.userId ? "YOU" : "RIVAL";
  const play2ViewVs = profile.id === play2?.userId ? "YOU" : "RIVAL";

  return (
    <div className="flex flex-col justify-center items-center absolute top-[65%] left-1/2 transform -translate-x-1/2 w-[343px] translate-y-[-5%] gap-[15px]">
      <div className="flex justify-center items-center relative">
        <div className="relative w-[171px] h-[40px]">
          <img
            src={image.leftPlayer}
            alt="left player"
            className="w-full h-full object-cover"
          />
          <p className="absolute inset-0 flex justify-center items-center font-montserrat text-[16px] font-extrabold leading-[19.5px] tracking-[-0.03em] text-center decoration-none">
            Player 1
          </p>
        </div>

        <div className="absolute w-[54px] h-[54px] flex justify-center items-center -translate-x-[0%] z-10">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-transparent to-transparent backdrop-blur-[20px]">
            <img
              src={image.ellipse}
              alt="ellipse"
              className="w-full h-full object-cover rounded-full"
            />
            <p className="absolute inset-0 flex justify-center items-center font-montserrat text-[16px] font-extrabold leading-[19.5px] tracking-[-0.03em] text-center decoration-none">
              VS
            </p>
          </div>
        </div>

        <div className="relative w-[171px] h-[40px]">
          <img
            src={image.rightPlayer}
            alt="right player"
            className="w-full h-full object-cover"
          />
          <p className="absolute inset-0 flex justify-center items-center font-montserrat text-[16px] font-extrabold leading-[19.5px] tracking-[-0.03em] text-center decoration-none">
            Player 2
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-[10px]">
        <div
          className={`${
            isVs ? "w-[154.52px]" : "w-[165.5px]"
          } flex flex-col justify-center items-center bg-[#FF2D2D4D]  h-[137px] gap-[8px] rounded-[16px] border border-[#FFFFFF1A] backdrop-blur-[10px]`}
        >
          {isVs ? (
            <p className="font-montserrat text-[16px] font-extrabold leading-[19.5px] tracking-[-0.03em] text-center text-[#FF2D2D]">
              {play1ViewVs}
            </p>
          ) : (
            play1 && (
              <User
                ava={play1?.User?.photoUrl}
                name={play1?.User?.userName}
                color={"white"}
                className={"max-w-[145px] h-[28px] pl-[3px]"}
              />
            )
          )}

          <div className="rounded-[8px] relative">
            <img
              src={image.catYellow}
              alt="cat yellow"
              className={`${
                isVs ? "w-[135px]" : "w-[148px]"
              } filter blur-[1px] h-[85px] object-cover rounded-[8px]`}
            />

            <div
              className={`flex justify-center items-center absolute w-[44px] h-[44px] gap-[4px] rounded-[16px] border-[1px] bg-gradient-to-b from-[#E56E50] to-[#D25335] border-[#EA845D] shadow-[0px_0px_10px_0px_#E56E50] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            >
              <div className="rounded-[12px] border-[1px] border-[#EA845D] w-[36px] h-[36px] gap-[10px] rounded-[12px] bg-white border-[#EA845D] flex justify-center items-center">
                <p className="font-[OpenSansHebrew] text-[16px] font-bold leading-[21.79px] tracking-[-0.03em] text-center decoration-skip-ink-none text-[#D25335]">
                  {play1?.point}
                </p>
              </div>
            </div>
          </div>
        </div>

        {isVs && (
          <img
            src={image.vsGame}
            alt="cat yellow"
            className="w-[26px] h-[48px] object-cover rounded-[8px]"
          />
        )}

        <div
          className={`${
            isVs ? "w-[154.52px]" : "w-[165.5px]"
          } flex flex-col justify-center items-center bg-[#33CDE94D] h-[137px] gap-[8px] rounded-[16px] border border-[#FFFFFF1A] backdrop-blur-[10px]`}
        >
          {isVs ? (
            <p className="font-montserrat text-[16px] font-extrabold leading-[19.5px] tracking-[-0.03em] text-center text-[#33CDE9]">
              {play2ViewVs}
            </p>
          ) : (
            play2 && (
              <User
                ava={play2?.User?.photoUrl}
                name={play2?.User?.userName}
                color={"white"}
                className={"max-w-[145px] h-[28px] pl-[3px]"}
              />
            )
          )}
          <div className="rounded-[8px] relative">
            <img
              src={image.catBlue}
              alt="cat blue"
              className={`${
                isVs ? "w-[135px]" : "w-[148px]"
              } filter blur-[1px] h-[85px] object-cover rounded-[8px]`}
            />

            <div className="absolute w-[44px] h-[44px] gap-[4px] rounded-[16px] border-t-[1px] bg-[#33CDE9] border-[#33CDE9] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
              <div className="w-[36px] h-[36px] gap-[10px] rounded-[12px] bg-white border-[#EA845D] flex justify-center items-center">
                <p className="font-[OpenSansHebrew] text-[16px] font-bold leading-[21.79px] tracking-[-0.03em] text-center decoration-skip-ink-none text-[#33CDE9]">
                  {play2?.point}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <LeaderBoard /> */}
    </div>
  );
}

export default Result;
