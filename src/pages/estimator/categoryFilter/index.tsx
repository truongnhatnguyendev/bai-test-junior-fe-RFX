import { SkeletonCategory } from "@/components/skeleton/skeletonCategory";
import { useFetch } from "@/hooks/useFetch";
import { categoryService } from "@/services/category/category.service";
import { CategoryEntity } from "@/types/category/category.interface";

interface Props {
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryFilter: React.FC<Props> = ({
  selectedCategoryId,
  onSelectCategory,
}) => {
  const { datas: categories, loading } =
    useFetch<CategoryEntity>(categoryService);
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="font-semibold">Categories</div>
      <ul className="space-y-4 text-sm">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonCategory key={i} />)
        ) : categories.length === 0 ? (
          <div className="col-span-full flex items-center justify-center h-full">
            <span className="text-sm font-semibold text-gray-500">
              No data found
            </span>
          </div>
        ) : (
          categories?.map((cat) => (
            <li
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`border-b cursor-pointer pb-1 ${
                selectedCategoryId === cat.id
                  ? "text-primary font-semibold"
                  : "text-[#7C7C7C]"
              }`}
            >
              {cat.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
