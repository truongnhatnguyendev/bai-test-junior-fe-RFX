import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonTimeLine() {
  return (
    <div className="flex mb-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-5 w-5 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-[500px]" />
        </div>
      </div>
    </div>
  );
}
