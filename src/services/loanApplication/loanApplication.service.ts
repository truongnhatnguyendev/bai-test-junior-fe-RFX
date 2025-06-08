import { LoanApplicationEntity } from "@/types/loanApplication/loanApplication";
import { RestBaseService } from "../rest-base.service";

export class LoanApplicationService extends RestBaseService<LoanApplicationEntity> {
  constructor() {
    super("http://localhost:3001", "loan-applications");
  }
}

export const loanApplicationService = new LoanApplicationService();
