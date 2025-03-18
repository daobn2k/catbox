import { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import LoadingCircle from "../../commons/LoadingCircle/LoadingCircle";
import useProfile from "../../utils/hooks/useProfile";
import { EFunctionName } from "./type";
import { useEventStream } from "../../utils/hooks/useEventStream";
import OpenGift from "../game/OpenGift";
import LoadingGame from "./LoadingGame";
export default function UnityGame() {
  const { data, startListening } = useEventStream();
  const [unityKey] = useState(Date.now());
  const [devicePixelRatio, setDevicePixelRatio] = useState(0);
  const {
    unityProvider,
    isLoaded,
    sendMessage,
    addEventListener,
    removeEventListener,
  } = useUnityContext({
    loaderUrl: "/game/axz.loader.js",
    dataUrl: "/game/axz.data.unityweb",
    frameworkUrl: "/game/axz.framework.js.unityweb",
    codeUrl: "/game/axz.wasm.unityweb",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "HamsterJet",
    productVersion: "1.0",
  });

  const { profile, refetchProfile } = useProfile();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    refetchProfile();
  }, []);

  useEffect(() => {
    if (!isLoaded || !profile) return;

    const params = {
      type: EFunctionName.USER_INFO,
      data: {
        ...profile,
        inviterId: profile?.inviterId || 0,
      },
    };
    sendMessage("Communication", "ReceiveMessage", JSON.stringify(params));
    setStarted(true);
  }, [isLoaded, profile, sendMessage]);

  useEffect(() => {
    const updateDevicePixelRatio = () => {
      setDevicePixelRatio(window.devicePixelRatio);
    };

    updateDevicePixelRatio();

    window.addEventListener("resize", updateDevicePixelRatio);

    return () => {
      window.removeEventListener("resize", updateDevicePixelRatio);
    };
  }, []);
  useEffect(() => {
    if (started && isLoaded) {
      startListening();
    }
  }, [started, isLoaded]);

  useEffect(() => {
    if (data?.length > 0) {
      const params = {
        type: "lobby",
        data: data,
      };
      sendMessage("Communication", "ReceiveMessage", JSON.stringify(params));
    }
  }, [data]);
  if (!devicePixelRatio) return <LoadingCircle />;
  return (
    <>
      <LoadingGame isLoaded={isLoaded} started={started} />
      <Unity
        unityProvider={unityProvider}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: "auto",
          zIndex: 9,
        }}
        tabIndex={1}
        devicePixelRatio={devicePixelRatio}
        key={unityKey}
      />
      <OpenGift
        sendMessage={sendMessage}
        isLoaded={isLoaded}
        started={started}
        addEventListener={addEventListener}
        removeEventListener={removeEventListener}
      />
    </>
  );
}
