import { useMutation } from "@tanstack/react-query";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { v1AuthTelegram } from "../../api/auth";
import image from "../../assets";
import LoadingCircle from "../../commons/LoadingCircle/LoadingCircle";

function StartLoading() {
  const [loading, setLoading] = useState(true);
  const v1AuthTelegramMutation = useMutation({
    mutationFn: (params) => v1AuthTelegram(params),
  });

  useEffect(() => {
    try {
      const { initDataRaw, initData } = retrieveLaunchParams();

      if (initDataRaw) {
        v1AuthTelegramMutation.mutate(
          {
            webAppInitDataStr: initDataRaw,
            webAppInitData: initData,
          },
          {
            onSuccess: (data) => {
              const { accessToken, refreshToken } = data?.data;
              console.log(accessToken, refreshToken, "abc");

              sessionStorage.setItem("accessToken", accessToken);
              sessionStorage.setItem("refreshToken", refreshToken);
              setTimeout(() => {
                console.log("Loading");
                setLoading(false);
              }, 2000);
            },
            onError: (error) => {},
          }
        );
      }
    } catch (error) {}
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full relative">
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
    );
  }
  console.log("abc");
  return <Navigate to="/game" />;
}

export default StartLoading;
