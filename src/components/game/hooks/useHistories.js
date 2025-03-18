import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import queryKeys from "../../../constants/queryKeys";
import { history } from "../../../api/turn";

export const initialParamsHistory = {
  limit: 10,
  page: 1,
  self: "0",
};

export default function useHistories(enabled = false) {
  const queryClient = useQueryClient();
  const { data: filterHistories } = useQuery({
    queryKey: [queryKeys.filterHistories],
    enabled: false,
    initialData: initialParamsHistory,
  });
  const {
    data: listHistories,
    isFetching: isFetchingListHistories,
    refetch: refetchListHistories,
  } = useQuery({
    queryKey: [queryKeys.histories, filterHistories],
    enabled,
    queryFn: () => history(filterHistories),
  });

  const setFilterHistories = useCallback(
    (newData) => {
      queryClient.setQueriesData(
        { queryKey: [queryKeys.filterHistories] },
        (oldData) => ({
          ...oldData,
          ...newData,
        })
      );
    },
    [queryClient]
  );

  useEffect(() => {
    if (listHistories?.data?.page > 1 && !listHistories?.data?.data?.length) {
      setFilterHistories({
        ...filterHistories,
        page: listHistories?.data?.page - 1,
      });
    }
  }, [listHistories]);

  return {
    listHistories: listHistories?.data,
    refetchListHistories,
    filterHistories,
    setFilterHistories,
    isFetchingListHistories,
  };
}
