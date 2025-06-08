import { UserEntity } from "@/types/user/user.interface";
import { RestBaseService } from "../rest-base.service";

export class UserService extends RestBaseService<UserEntity> {
  constructor() {
    super("http://localhost:3001", "users");
  }
  getTypes(): Promise<{ type: string; userId: string }[]> {
    return this.fetch(this.getBaseUrl() + "/types", {
      method: "GET",
    });
  }
  getUserNames(): Promise<{ userName: string; userId: string }[]> {
    return this.fetch(this.getBaseUrl() + "/userName", {
      method: "GET",
    });
  }
}

export const userService = new UserService();
