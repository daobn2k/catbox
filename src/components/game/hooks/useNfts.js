import { useQuery } from "@tanstack/react-query";
import { nfts } from "../../../api/nft";
import queryKeys from "../../../constants/queryKeys";

export default function useNfts(enabled) {
  const {
    data: data,
    isFetching: isFetchingDataNfts,
    refetch: refetchDataNfts,
  } = useQuery({
    queryKey: [queryKeys.nfts],
    enabled,
    queryFn: () => nfts(),
  });

  return {
    dataNfts: data?.data,
    isFetchingDataNfts,
    refetchDataNfts,
  };
}
