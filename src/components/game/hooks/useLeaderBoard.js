import { useQuery } from "@tanstack/react-query";
import { leaderBoard } from "../../../api/turn";
import queryKeys from "../../../constants/queryKeys";

export default function useLeaderBoard(enabled) {
  const {
    data: data,
    isFetching: isFetchingDataLeaderBoard,
    refetch: refetchDataLeaderBoard,
  } = useQuery({
    queryKey: [queryKeys.LeaderBoard],
    enabled,
    queryFn: () => leaderBoard(),
  });

  return {
    dataLeaderBoard: data?.data,
    isFetchingDataLeaderBoard,
    refetchDataLeaderBoard,
  };
}
