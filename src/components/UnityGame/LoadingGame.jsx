import clsx from "clsx";
import image from "../../assets";
import LoadingCircle from "../../commons/LoadingCircle/LoadingCircle";
export default function LoadingGame({ isLoaded, started }) {
  return (
    <div
      className={clsx("fixed top-0 left-0 right-0 bottom-0 z-[999] bg-black", {
        ["z-[-1] hidden"]: started && isLoaded,
      })}
    >
      <div className="flex justify-center items-center h-full relative">
        <video
          className="absolute top-0 left-0 right-0 bottom-0 object-cover w-full"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={image.background2} type="video/mp4" />
        </video>
        <img
          src={image.fireworkStartLoading}
          alt="fire work"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-85%] w-49 h-49 object-cover"
        />
        <img
          src={image.giftStartLoading}
          alt="gift start loading"
          className="absolute max-w-full max-h-full object-contain translate-y-[-35%]"
        />

        <div className="absolute translate-y-[70%] w-full px-4">
          <div className="mb-4 relative bg-gradient-to-r from-white/30 to-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20">
            <p className="font-montserrat text-2xl font-bold leading-snug tracking-tight text-center text-[#D25335]">
              Play <span className="text-[#FF7643]">CatBox</span> to earn
              <br />
              DELI tokens and receive
              <br />
              attractive airdrops
            </p>
          </div>

          <div className="flex justify-center items-center gap-4">
            <div className="w-[70px] backdrop-blur-[40px] border-1 border-solid bg-[#00000066] flex flex-col justify-start items-center px-2 py-1">
              <img
                src={image.logoS5}
                alt="logoS1"
                className="w-[30px] h-[30px] object-cover rounded-full"
              />
              {/* <span className="font-bold text-white text-[0.4rem] text-center uppercase">
            Poor to Rick
          </span> */}
            </div>
            <div className="w-[70px] backdrop-blur-[40px] border-1 border-solid bg-[#00000066] flex flex-col justify-start items-center px-2 py-1">
              <img
                src={image.logoS2}
                alt="logoS1"
                className="w-[30px] h-[30px] object-cover rounded-full"
              />
              {/* <span className="font-bold text-white text-[0.4rem] text-center uppercase">
            UFIN GROUP
          </span> */}
            </div>
            <div className="w-[70px] backdrop-blur-[40px] border-1 border-solid bg-[#00000066] flex flex-col justify-start items-center px-2 py-1">
              <img
                src={image.logoS1}
                alt="logoS1"
                className="w-[60px] h-[30px] object-cover"
              />
              {/* <span className="font-bold text-white text-[0.4rem] text-center uppercase">
            zukiss
          </span> */}
            </div>
            <div className="w-[70px] backdrop-blur-[40px] border-1 border-solid bg-[#00000066] flex flex-col justify-start items-center px-2 py-1">
              <img
                src={image.logoS3}
                alt="logoS1"
                className="w-[30px] h-[30px] object-cover rounded-full"
              />
              {/* <span className="font-bold text-white text-[0.4rem] text-center uppercase">
            ?????
          </span> */}
            </div>

            <div className="w-[70px] backdrop-blur-[40px] border-1 border-solid bg-[#00000066] flex flex-col justify-start items-center px-2 py-1">
              <img
                src={image.logoS4}
                alt="logoS1"
                className="w-[30px] h-[30px] object-cover rounded-full"
              />
              {/* <span className="font-bold text-white text-[0.4rem] text-center uppercase">
            BCD
          </span> */}
            </div>
          </div>
        </div>

        <div className="absolute translate-y-[42%]">
          <LoadingCircle />
        </div>
      </div>
    </div>
  );
}
