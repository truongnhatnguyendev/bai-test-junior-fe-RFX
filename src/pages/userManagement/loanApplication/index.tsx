import { ColumnsType, RestfulTable } from "@/components/RestfulTable";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { loanApplicationService } from "@/services/loanApplication/loanApplication.service";
import { LoanApplicationEntity } from "@/types/loanApplication/loanApplication";
import { FileText } from "lucide-react";
import { useMemo } from "react";

export function LoanApplication() {
  const Columns: ColumnsType<LoanApplicationEntity>[] = useMemo(
    () => [
      {
        key: "id",
        title: "Index",
      },
      {
        key: "Borrower Name",
        title: (
          <div className="flex flex-col">
            <span>Borrower Name</span>
            <span>Loan ID</span>
          </div>
        ),
        render: (_: any, record: LoanApplicationEntity) => {
          return (
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <p className="font-semibold">{record?.borrowerName}</p>
                <p className="text-xs">{record.borrowerId}</p>
              </div>
            </div>
          );
        },
      },
      {
        key: "lender",
        title: (
          <div className="flex flex-col">
            <span>Lender</span>
            <span>Interest Rate</span>
          </div>
        ),
        render: (_: any, record: LoanApplicationEntity) => {
          return (
            <>
              {record.lender}
              <br />
              <div className="flex gap-1 text-xs text-gray-500">
                <span>{record.interestRate}</span>
                <span>{`(${record.apr} APR)`}</span>
              </div>
            </>
          );
        },
      },
      {
        key: "progress",
        title: "process",
        render: (_: any, record: LoanApplicationEntity) => {
          return (
            <div className="flex items-center gap-2">
              <Progress className="h-1.5" value={record.progress} />{" "}
              <span>{record.progress}%</span>
            </div>
          );
        },
      },
      {
        title: "Status",
        key: "status",
        render: (_: any, record: LoanApplicationEntity) => {
          return (
            <Badge variant="secondary" className="bg-[#E6F7FF] text-[#0EA5E9]">
              {record.status}
            </Badge>
          );
        },
      },
      {
        title: "Action",
        key: "action",
        render: () => {
          return <FileText size={16} className="text-blue-600" />;
        },
      },
    ],
    []
  );
  return <RestfulTable service={loanApplicationService} columns={Columns} />;
}
