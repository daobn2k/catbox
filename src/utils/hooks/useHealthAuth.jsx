import { useQuery } from "@tanstack/react-query";
import { healthAuth } from "../../api/common";
import queryKeys from "../../constants/queryKeys";

export default function useHealthAuth(enabled = false) {
  const { data: result, refetch: refetchHealthAuth } = useQuery({
    queryKey: [queryKeys.healthAuth],
    enabled,
    queryFn: healthAuth,
  });

  return { data: result?.data, refetchHealthAuth };
}
