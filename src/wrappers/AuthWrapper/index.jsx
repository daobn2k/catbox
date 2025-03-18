import { Navigate, Outlet } from "react-router-dom";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import routePaths from "../../constants/routePaths";
import useProfile from "../../utils/hooks/useProfile";
import useMetadata from "../../utils/hooks/useMetadata";

function AuthWrapper() {
  useProfile(true);
  useMetadata(true);

  try {
    const { initDataRaw } = retrieveLaunchParams();
    if (!initDataRaw) return <Navigate to={routePaths.home} />;
    // const isAuthenticated = !!sessionStorage.setItem("accessToken");
    // if (!isAuthenticated) return <Navigate to={routePaths.game} />;
  } catch (error) {
    return <Navigate to={routePaths.home} />;
  }

  return <Outlet />;
}

export default AuthWrapper;
