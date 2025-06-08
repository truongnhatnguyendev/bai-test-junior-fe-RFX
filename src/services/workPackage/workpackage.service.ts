import { WorkPackageEntity } from "@/types/workPackage/workPackage.interface";
import { RestBaseService } from "../rest-base.service";

export class WorkpackageService extends RestBaseService<WorkPackageEntity> {
  constructor() {
    super("http://localhost:3001", "workpackages");
  }
}

export const workpackageService = new WorkpackageService();
