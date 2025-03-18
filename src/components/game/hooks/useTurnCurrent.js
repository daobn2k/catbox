import { useQuery } from "@tanstack/react-query";
import { getTurnCurrent } from "../../../api/turn";
import queryKeys from "../../../constants/queryKeys";

export default function useDataTurnCurrentGame(enabled) {
  const {
    data: data,
    isFetching: isFetchingDataTurnCurrentGame,
    refetch: refetchDataTurnCurrentGame,
  } = useQuery({
    queryKey: [queryKeys.turnCurrentGame],
    enabled,
    queryFn: () => getTurnCurrent(),
  });

  return {
    dataTurnCurrentGame: data?.data,
    isFetchingDataTurnCurrentGame,
    refetchDataTurnCurrentGame,
  };
}
