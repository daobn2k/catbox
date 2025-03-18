import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
} from "@nextui-org/react";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import image from "../../../assets";
import useHistories from "../hooks/useHistories";
import { ActionChangePage } from "../../../constants/enum";
const Histories = (_, ref) => {
  const {
    listHistories,
    refetchListHistories,
    filterHistories,
    setFilterHistories,
    isFetchingListHistories,
  } = useHistories(true);

  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  useImperativeHandle(ref, () => {
    return {
      onOpen: () => {
        onOpen();
        refetchListHistories();
      },
      onClose: () => onClose(),
    };
  });

  const columns = [
    {
      key: "player",
      label: "Player",
    },
    {
      key: "enemy",
      label: "Enemy",
    },
    {
      key: "result",
      label: "Result",
    },
  ];

  const formatValue = (value, columnKey) => {
    if (columnKey === "player") {
      return value.player.userName;
    }
    if (columnKey === "enemy") {
      return value.enemy.userName;
    }
    return value[columnKey];
  };

  const setSelectedData = (data) => {
    setFilterHistories({ self: data, page: 1 });
  };

  const handleChangePage = (action) => () => {
    const page = filterHistories?.page;
    const newPage = action === ActionChangePage.NEXT ? page + 1 : page - 1;
    if (!newPage || newPage > listHistories?.totalPage) return;
    setFilterHistories({ page: newPage });
  };

  const notPre = filterHistories?.page === 1;
  const notNext = filterHistories?.page === listHistories?.totalPage;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-40">
          <div className="backdrop-blur-[40px] border-2 border-solid bg-[#00000066] w-full h-[80%] mx-2.5 rounded-[16px] pt-2 px-2 flex flex-col justify-between">
            <div
              className="flex justify-end w-full cursor-pointer"
              onClick={onClose}
            >
              <img
                src={image.quitAll}
                alt="coin"
                className="w-[30px] h-[30px] object-cover"
              />
            </div>
            <div className="w-full flex flex-col gap-4">
              <Tabs
                aria-label="Options"
                classNames={{
                  tabList: "gap-6 w-full relative rounded-none p-0",
                  cursor: "w-full bg-white",
                  tab: "w-full px-0 h-12",
                  tabContent:
                    "text-[#bbbaba] group-data-[selected=true]:text-white",
                  base: "w-full",
                }}
                color="primary"
                variant="underlined"
                onSelectionChange={setSelectedData}
                selectedKey={filterHistories.self}
              >
                <Tab
                  key={"0"}
                  title={
                    <div className="flex items-center space-x-2">
                      <span>History</span>
                    </div>
                  }
                />
                <Tab
                  key={"1"}
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Your history</span>
                    </div>
                  }
                />
              </Tabs>
              <Table
                aria-label="Example table with dynamic content"
                className="h-[55vh]"
              >
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  )}
                </TableHeader>
                <TableBody items={listHistories?.data}>
                  {(item) => {
                    return (
                      <TableRow key={item.id}>
                        {(columnKey) => (
                          <TableCell className="text-black">
                            {formatValue(item, columnKey)}
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  }}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-center h-[55px] items-center">
              <img
                src={image.chevronLeft}
                alt="pre"
                className={`${
                  notPre ? "cursor-not-allowed" : "cursor-pointer"
                } w-[50px] h-[50px] rounded-full object-cover`}
                onClick={handleChangePage(ActionChangePage.PREV)}
              />
              <span>
                {filterHistories.page} / {listHistories.totalPage || 1}
              </span>
              <img
                src={image.chevronRight}
                alt="next"
                className={`${
                  notNext ? "cursor-not-allowed" : "cursor-pointer"
                } w-[50px] h-[50px] rounded-full object-cover`}
                onClick={handleChangePage(ActionChangePage.NEXT)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(forwardRef(Histories));
