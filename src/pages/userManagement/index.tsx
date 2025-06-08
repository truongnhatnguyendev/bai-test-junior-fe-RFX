import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  ChartLine,
  ExternalLink,
  Files,
  FileText,
  LibraryBig,
  NotebookPen,
  Percent,
  RefreshCcw,
} from "lucide-react";

import { IMAGES } from "../../assets/index";
import {
  ColumnsType,
  RestfulTable,
  RestfulTableRef,
} from "@/components/RestfulTable";
import { userService } from "@/services/user/user.service";
import { useMemo, useRef, useState } from "react";
import { UserEntity } from "@/types/user/user.interface";
import { SidebarFilter, valueFilterEntity } from "./sidebarFilter";
import { DeepPartial } from "@/utils/deepPartial";
import { Accordion } from "@/components/Accordion";
import { GridItem } from "@/components/GridItem";
import { Header } from "@/components/Header";
import { LoanApplication } from "./loanApplication";

export function UserManagementPage() {
  const tableRef = useRef<RestfulTableRef>(null);
  const [valueFilter, setValueFilter] = useState<
    DeepPartial<valueFilterEntity>
  >({});
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRows, setSelectedRows] = useState<UserEntity[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const Columns: ColumnsType<UserEntity>[] = useMemo(
    () => [
      {
        key: "userName",
        title: (
          <div className="flex flex-col">
            <span>User Name</span>
            <span>User ID</span>
          </div>
        ),
        sorter: true,
        render: (_: any, record: UserEntity) => {
          return (
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  loading="lazy"
                  src={IMAGES.avatar}
                  className="w-full h-full"
                  alt="avatar"
                />
              </Avatar>
              <div className="flex flex-col">
                <p className="font-semibold">{record?.userName}</p>
                <p className="text-xs">{record.userId}</p>
              </div>
            </div>
          );
        },
      },
      {
        key: "contact",
        title: "Contact Info",
        render: (_: any, record: UserEntity) => {
          return (
            <div className="flex flex-col">
              <p className="font-semibold">{record?.contact?.email}</p>
              <p className="text-xs">{record?.contact?.phone}</p>
            </div>
          );
        },
      },
      { key: "type", title: "Type" },
      { key: "experience", title: "Experience" },
      {
        title: "Status",
        key: "status",
        render: (_: any, record: UserEntity) => {
          return (
            <span className="font-semibold px-2.5 rounded-sm bg-[#F6FFED] text-[#43A047]">
              {record?.status}
            </span>
          );
        },
      },
    ],
    []
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await tableRef.current?.refresh();
    setTimeout(() => setIsRefreshing(false), 200);
  };

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex h-[calc(100vh-60px)]">
        {/* Sidebar Filter */}
        <SidebarFilter onFilterChange={(filters) => setValueFilter(filters)} />
        {/* Main Content */}
        <div className="flex-1 h-full flex">
          <div className="grid grid-cols-1 h-full w-full sm:grid-cols-2 ">
            {/* User List */}
            <ScrollArea className="w-full h-full border-r">
              <div className="flex items-center gap-4 px-4 text-xl font-bold h-[60px] border-b bg-white">
                {totalUsers} USERS{" "}
                <RefreshCcw
                  className={`cursor-pointer transition-transform ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                  onClick={handleRefresh}
                />
              </div>
              <RestfulTable
                ref={tableRef}
                rowSelection={{
                  selectedRowKeys: selectedKeys,
                  onChange: (keys, rows) => {
                    setSelectedKeys(keys);
                    setSelectedRows(rows);
                  },
                  rowKey: "userId",
                }}
                service={userService}
                pageSize={5}
                columns={Columns}
                filter={valueFilter}
                onData={(_, total) => setTotalUsers(total)}
              />
            </ScrollArea>

            {/* Details Panel */}
            <ScrollArea className="w-full ">
              <div className="p-5">
                <Accordion
                  icon={<LibraryBig size={16} />}
                  title="GENERAL INFORMATION"
                  isShowContent
                >
                  <div className="grid grid-cols-4 gap-4 py-3">
                    {[
                      {
                        firstName: "David",
                        lastName: "Nguyen",
                        experience: "5 years",
                        website: "david.com",
                      },
                      {
                        firstName: "David",
                        lastName: "Nguyen",
                        experience: "5 years",
                        website: "david.com",
                      },
                    ].flatMap((user, index) => [
                      <GridItem
                        key={`first-name-${index}`}
                        label="First Name"
                        value={user.firstName}
                      />,
                      <GridItem
                        key={`last-name-${index}`}
                        label="Last Name"
                        value={user.lastName}
                      />,
                      <GridItem
                        key={`experience-${index}`}
                        label="Experience"
                        value={user.experience}
                      />,
                      <GridItem
                        key={`website-${index}`}
                        label="Personal Website"
                        value={user.website}
                      />,
                    ])}
                  </div>
                </Accordion>

                <Accordion
                  icon={<Percent size={16} />}
                  title="COMMISSION STRUCTURES"
                  showExternalLink={true}
                  showChevron={true}
                  tooltipContent="You don't have permission to open this link"
                />

                <Accordion
                  showChevron
                  showExternalLink
                  icon={<FileText size={16} />}
                  title="RECRUITMENT DOCUMENTS"
                />
                <Accordion
                  showChevron
                  icon={<Files size={16} />}
                  title="RELATED CLIENTS & LOAN DOCUMENTS"
                  isShowContent
                >
                  <LoanApplication />
                </Accordion>
                <Accordion
                  showChevron
                  icon={<ChartLine size={16} />}
                  title="PERFORMANCE"
                />

                <Accordion
                  isShowContent
                  icon={<NotebookPen size={16} />}
                  title="TO-DO"
                >
                  <div className="space-y-2 py-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="todo1" />
                      <label htmlFor="todo1">Review Loan Applications </label>
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="todo2" />
                      <label htmlFor="todo2">Contact to Borrower</label>
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex items-center text-[#D9D9D9] space-x-2">
                      <Checkbox disabled id="todo3" className="bg-[#D9D9D9]" />
                      <label htmlFor="todo3">Click to add new todo </label>
                    </div>
                  </div>
                </Accordion>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
