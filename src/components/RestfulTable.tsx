import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RestBaseService } from "@/services/rest-base.service";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  MoveDown,
  MoveUp,
  MoveVertical,
} from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SkeletonTable } from "./skeleton/skeletonTable";

export interface ColumnsType<T> {
  key: keyof T;
  title: string | React.ReactNode;
  render?: (value: any, record: T) => React.ReactNode;
  className?: string;
  sorter?: boolean;
}

export interface RestfulTableProps<T> {
  service: RestBaseService<T>;
  columns: ColumnsType<T>[];
  caption?: string;
  pageSize?: number;
  filter?: Record<string, any>;
  rowSelection?: {
    selectedRowKeys: React.Key[];
    onChange: (selectedKeys: React.Key[], selectedRows: T[]) => void;
    rowKey?: keyof T;
  };
  onData?: (data: T[], total: number) => void;
}

export interface RestfulTableRef {
  refresh: () => void;
}

export const RestfulTable = forwardRef<RestfulTableRef, RestfulTableProps<any>>(
  (props, ref: React.Ref<RestfulTableRef>) => {
    const { service, columns, caption, pageSize = 0, filter, onData } = props;
    const [page, setPage] = useState(1);
    const [data, setData] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [customPageSize, setCustomPageSize] = useState(pageSize);
    const [sortBy, setSortField] = useState<keyof any | undefined>();
    const [order, setSortOrder] = useState<"asc" | "desc" | undefined>();

    const rowKey = props.rowSelection?.rowKey || "id";
    const selectedRowKeys = props.rowSelection?.selectedRowKeys || [];

    const isChecked = (record: any) => selectedRowKeys.includes(record[rowKey]);

    const toggleRow = (record: any, checked: boolean) => {
      const key = record[rowKey];
      let newSelected: React.Key[] = [];

      if (checked) {
        newSelected = [...selectedRowKeys, key];
      } else {
        newSelected = selectedRowKeys.filter((k) => k !== key);
      }

      props.rowSelection?.onChange(
        newSelected,
        data.filter((d) => newSelected.includes(d[rowKey]))
      );
    };

    const toggleSelectAll = (checked: boolean) => {
      const currentPageKeys = data.map((d) => d[rowKey]);
      let newSelected: React.Key[] = [];

      if (checked) {
        // Thêm tất cả keys từ trang hiện tại mà chưa được chọn
        newSelected = Array.from(
          new Set([...selectedRowKeys, ...currentPageKeys])
        );
      } else {
        // Loại bỏ tất cả keys từ trang hiện tại
        newSelected = selectedRowKeys.filter(
          (k) => !currentPageKeys.includes(k)
        );
      }

      props.rowSelection?.onChange(
        newSelected,
        data.filter((d) => newSelected.includes(d[rowKey]))
      );
    };

    const loadData = async () => {
      setLoading(true);
      try {
        if (pageSize > 0) {
          const res = await service.getPagination(customPageSize, page, {
            ...filter,
            sortBy,
            order,
          });

          setData(res.data);
          setTotal(res.total);
          // Nếu page hiện tại > tổng số trang thì reset lại
          const totalPages = Math.ceil(res.total / customPageSize);
          if (page > totalPages) setPage(1);
        } else {
          const res = await service.getMany();
          setData(res);
          setTotal(res.length);
        }
      } finally {
        setLoading(false);
      }
    };

    useImperativeHandle(ref, () => ({
      refresh: loadData,
    }));

    useEffect(() => {
      loadData();
    }, [page, customPageSize, JSON.stringify(filter), sortBy, order]);

    useEffect(() => {
      onData?.(data, total);
    }, [data]);

    function getPaginationRange(
      current: number,
      total: number
    ): (number | string)[] {
      const delta = 2;
      const range: (number | string)[] = [];

      for (
        let i = Math.max(2, current - delta);
        i <= Math.min(total - 1, current + delta);
        i++
      ) {
        range.push(i);
      }

      if (current - delta > 2) {
        range.unshift("...");
      }
      if (current + delta < total - 1) {
        range.push("...");
      }

      range.unshift(1);
      if (total > 1) range.push(total);

      return range;
    }

    const totalPages = Math.ceil(total / customPageSize);

    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto">
          <Table>
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
              <TableRow className="bg-[#DAE6EF]  hover:bg-[#DAE6EF] text-sm font-medium">
                {props.rowSelection && (
                  <TableHead>
                    <Checkbox
                      className="bg-white"
                      id="select-all"
                      checked={
                        data?.length > 0 &&
                        data.every((d) => selectedRowKeys.includes(d[rowKey]))
                      }
                      onCheckedChange={(checked) =>
                        toggleSelectAll(checked === true)
                      }
                    />
                  </TableHead>
                )}
                {columns?.map((col) => {
                  const isSorted = sortBy === col.key;
                  const isAsc = isSorted && order === "asc";
                  const isDesc = isSorted && order === "desc";
                  return (
                    <TableHead
                      key={String(col.key)}
                      className={`${col.className} ${
                        col.sorter ? "flex items-center justify-between" : ""
                      }`}
                      onClick={() => {
                        if (!col.sorter) return;
                        if (sortBy !== col.key) {
                          setSortField(col.key);
                          setSortOrder("asc");
                        } else if (order === "asc") {
                          setSortOrder("desc");
                        } else if (order === "desc") {
                          setSortField(undefined);
                          setSortOrder(undefined);
                        }
                      }}
                    >
                      <span>{col.title}</span>
                      {col.sorter && (
                        <span className="text-xs">
                          {isAsc ? (
                            <MoveUp size={14} />
                          ) : isDesc ? (
                            <MoveDown size={14} />
                          ) : (
                            <MoveVertical size={14} />
                          )}
                        </span>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <SkeletonTable />
              ) : data.length > 0 ? (
                data.map((item, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-muted cursor-pointer"
                  >
                    {props.rowSelection && (
                      <TableCell>
                        <Checkbox
                          checked={isChecked(item)}
                          onCheckedChange={(checked) =>
                            toggleRow(item, checked === true)
                          }
                        />
                      </TableCell>
                    )}
                    {columns.map((col) => (
                      <TableCell
                        key={String(col.key)}
                        className={col.className}
                      >
                        {col.render
                          ? col.render(item[col.key], item)
                          : item[col.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-muted cursor-pointer">
                  <TableCell
                    className="text-center bg-[#F5F5F5] text-[#7C7C7C] border-b border-[#e1e0e0]"
                    height={100}
                    colSpan={
                      props.rowSelection ? columns.length + 1 : columns.length
                    }
                  >
                    No data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            {/* {data.length > 0 && (
              <TableFooter>
                <TableRow className="text-[#637381] hover:bg-white bg-white">
                  <TableCell
                    colSpan={
                      props.rowSelection ? columns.length + 1 : columns.length
                    }
                  >
                    <div className="flex justify-between items-center gap-4 px-2 py-2">
                      <div className="flex items-center gap-1">
                        <Button
                          variant={"outline"}
                          disabled={page === 1 || loading}
                          onClick={() => setPage((p) => Math.max(p - 1, 1))}
                          className="border rounded disabled:opacity-50"
                        >
                          <ChevronLeft strokeWidth={1.25} absoluteStrokeWidth />
                        </Button>

                        {getPaginationRange(page, totalPages).map((p, i) => (
                          <Button
                            variant="outline"
                            key={i}
                            disabled={p === "..."}
                            className={` border rounded ${
                              p === page ? "bg-[#E6EFF3] border-primary" : ""
                            }`}
                            onClick={() => typeof p === "number" && setPage(p)}
                          >
                            {p}
                          </Button>
                        ))}

                        <Button
                          variant={"outline"}
                          disabled={page === totalPages || loading}
                          onClick={() =>
                            setPage((p) => Math.min(p + 1, totalPages))
                          }
                          className="border rounded disabled:opacity-50"
                        >
                          <ChevronRight
                            strokeWidth={1.25}
                            absoluteStrokeWidth
                          />
                        </Button>
                      </div>
                      <Select
                        value={String(customPageSize)}
                        onValueChange={(value) => {
                          const newSize = Number(value);
                          setCustomPageSize(newSize);
                          setPage(1);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[5, 10, 20, 50].map((n) => (
                            <SelectItem key={n} value={String(n)}>
                              {n.toString().padStart(2, "0")} items
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              </TableFooter>
            )} */}
          </Table>
        </div>
        {data.length > 0 && pageSize > 0 && (
          <div className="border-t mt-auto w-full absolute left-0 bottom-0 bg-white px-4 py-2">
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-1">
                <Button
                  variant={"outline"}
                  disabled={page === 1 || loading}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className="border rounded disabled:opacity-50"
                >
                  <ChevronLeft strokeWidth={1.25} absoluteStrokeWidth />
                </Button>

                {getPaginationRange(page, totalPages).map((p, i) => (
                  <Button
                    variant="outline"
                    key={i}
                    disabled={p === "..."}
                    className={` border rounded ${
                      p === page ? "bg-[#E6EFF3] border-primary" : ""
                    }`}
                    onClick={() => typeof p === "number" && setPage(p)}
                  >
                    {p}
                  </Button>
                ))}

                <Button
                  variant={"outline"}
                  disabled={page === totalPages || loading}
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  className="border rounded disabled:opacity-50"
                >
                  <ChevronRight strokeWidth={1.25} absoluteStrokeWidth />
                </Button>
              </div>
              <Select
                value={String(customPageSize)}
                onValueChange={(value) => {
                  const newSize = Number(value);
                  setCustomPageSize(newSize);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 20, 50].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n.toString().padStart(2, "0")} items
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    );
  }
);
