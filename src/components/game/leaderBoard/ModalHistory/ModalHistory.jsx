import {
  Modal,
  ModalBody,
  ModalContent,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { history } from "../../../../api/turn";

const ModalHistory = (_, ref) => {
  const [selected, setSelected] = React.useState("0");
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [data, setData] = useState([]);
  const close = () => {
    onClose();
  };
  useImperativeHandle(ref, () => {
    return {
      onOpen: () => {
        onOpen();
      },
      onClose: () => close(),
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

  useEffect(() => {
    fetchData(+selected);
  }, [selected]);

  const fetchData = async (self) => {
    const res = await history({ self, page: 1, limit: 1000 });
    setData(res?.data?.data || []);
  };

  const formatValue = (value, columnKey) => {
    if (columnKey === "player") {
      return value.player.userName;
    }
    if (columnKey === "enemy") {
      return value.enemy.userName;
    }
    return value[columnKey];
  };


  return (
    <Modal
      isOpen={isOpen}
      placement={"center"}
      onOpenChange={onOpenChange}
      isDismissable
      onClose={onClose}
      hideCloseButton
      classNames={{
        base: "!m-0 bg-white  !p-0 !px-4 border-none outline-none shadow-none",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalBody className="p-0  pb-6 rounded-[16px]">
              <Tabs
                aria-label="Options"
                classNames={{
                  tabList: "gap-6 w-full relative rounded-none p-0",
                  cursor: "w-full bg-black",
                  tab: "w-full px-0 h-12",
                  tabContent:
                    "text-secondary group-data-[selected=true]:text-black",
                }}
                color="primary"
                variant="underlined"
                onSelectionChange={setSelected}
                selectedKey={selected}
              >
                <Tab
                  key={"0"}
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Race History</span>
                    </div>
                  }
                />
                <Tab
                  key={"1"}
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Bet History</span>
                    </div>
                  }
                />
              </Tabs>
              <Table aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  )}
                </TableHeader>
                <TableBody items={data}>
                  {(item) => {
                    return (
                      <TableRow key={item?.winId}>
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
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(ModalHistory);
