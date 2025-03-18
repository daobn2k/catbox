import { useQuery } from "@tanstack/react-query";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { getProfile } from "../../api/profile";
import queryKeys from "../../constants/queryKeys";

export default function useProfile(enabled = false) {
  const { initData } = retrieveLaunchParams();
  const { data: profile, refetch: refetchProfile } = useQuery({
    queryKey: [queryKeys.profile],
    enabled,
    queryFn: getProfile,
  });
  return { profile: { ...profile?.data, ...initData?.user }, refetchProfile };
}
