import { useQuery } from "@tanstack/react-query";
import { metadata } from "../../api/turn";
import queryKeys from "../../constants/queryKeys";

export default function useMetadata(enabled = false) {
  const { data: result, refetch: refetchProfile } = useQuery({
    queryKey: [queryKeys.metadata],
    enabled,
    queryFn: metadata,
  });

  return { metadata: result?.data, refetchProfile };
}
