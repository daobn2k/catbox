import loadable from "@loadable/component";
import { useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import image from "../../assets";
import routePaths from "../../constants/routePaths";
import AuthWrapper from "../AuthWrapper";

const StartLoading = loadable(() =>
  import("../../components/startLoading/StartLoading")
);
const Game = loadable(() => import("../../components/game/Game"));

function AppWrapper() {
  const { pathname } = useLocation();
  const musicRef = useRef(null);
  const [isPaused, setIsPaused] = useState(true);

  const handleClickMusic = () => {
    const music = musicRef?.current;
    if (music?.paused) {
      music?.play();
      setIsPaused(false);
    } else {
      music?.pause();
      setIsPaused(true);
    }
  };
  return (
    <div className="overflow-hidden">
      {/* <div
        className="fixed right-1 top-6 z-50 cursor-pointer"
        onClick={handleClickMusic}
      >
        {isPaused ? (
          <img
            src={image.mute}
            alt="volumeUp"
            className="w-[24px] h-[24px] rounded-full object-cover"
          />
        ) : (
          <img
            src={image.volumeUp}
            alt="volumeUp"
            className="w-[24px] h-[24px] rounded-full object-cover"
          />
        )}
      </div> */}
      {pathname !== "/game" && (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={image.background2} type="video/mp4" />
        </video>
      )}
      {/* <video
        hidden
        src={image.music}
        ref={musicRef}
        autoPlay
        muted={false}
        loop
        playsInline
        disablePictureInPicture
        onLoadedMetadata={() => {
          musicRef.current.play().then(() => {
            setIsPaused(false);
          });
          musicRef.current.volume = 0.2;
        }}
      ></video> */}
      {/* <div className="container bg-start-loading bg-cover bg-center h-screen w-full"> */}
      <div className="h-[100dvh] w-full">
        <Routes>
          <Route path={routePaths.home} element={<StartLoading />} />
          <Route path={routePaths.loading} element={<StartLoading />} />
          <Route path={routePaths.game} element={<AuthWrapper />}>
            <Route path={routePaths.game} element={<Game />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default AppWrapper;
