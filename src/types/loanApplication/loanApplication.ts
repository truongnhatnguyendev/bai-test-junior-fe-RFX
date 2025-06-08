export interface LoanApplicationEntity {
  id: string;
  borrowerName: string;
  borrowerId: string;
  lender: string;
  interestRate: string;
  apr: string;
  progress: number;
  status: string;
}
