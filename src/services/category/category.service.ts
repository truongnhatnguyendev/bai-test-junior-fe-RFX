import { RestBaseService } from "../rest-base.service";
import { CategoryEntity } from "@/types/category/category.interface";

export class CategoryService extends RestBaseService<CategoryEntity> {
  constructor() {
    super("http://localhost:3001", "category");
  }
}

export const categoryService = new CategoryService();
