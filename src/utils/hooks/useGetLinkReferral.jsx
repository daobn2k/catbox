import { useQuery } from "@tanstack/react-query";
import { getLinkReferral } from "../../api/referral";
import queryKeys from "../../constants/queryKeys";

export default function useGetLinkReferral(enabled = false) {
  const { data: result, refetch: refetchGetLinkReferral } = useQuery({
    queryKey: [queryKeys.getLinkReferral],
    enabled,
    queryFn: getLinkReferral,
  });

  return { linkReferral: result?.data, refetchGetLinkReferral };
}
