import { useQuery } from "@tanstack/react-query";
import { myNft, nfts } from "../../../api/nft";
import queryKeys from "../../../constants/queryKeys";

export default function useMyNfts(enabled) {
  const {
    data: data,
    isFetching: isFetchingMyNfts,
    refetch: refetchMyNfts,
  } = useQuery({
    queryKey: [queryKeys.myNfts],
    enabled,
    queryFn: () => myNft(),
  });

  return {
    myNfts: data?.data,
    isFetchingMyNfts,
    refetchMyNfts,
  };
}
