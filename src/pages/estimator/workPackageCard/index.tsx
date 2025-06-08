import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WorkPackageEntity } from "@/types/workPackage/workPackage.interface";
import { ChevronRight, ShoppingCart } from "lucide-react";

export interface WorkPackageCardProps {
  workPackage: WorkPackageEntity;
}

export const WorkPackageCard = ({ workPackage: wp }: WorkPackageCardProps) => (
  <Card className="h-[196px] p-0 rounded-sm hover:shadow-md transition-shadow">
    <CardContent className="space-y-3 h-full flex flex-col p-3">
      <div className="flex items-center justify-between font-semibold">
        {wp.title}
        <ChevronRight className="text-[#7C7C7C]" />
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2">
        {wp.description}
      </p>

      <div className="flex gap-2 mt-2">
        {[1, 2].map((i) => (
          <Button
            key={i}
            size="icon"
            variant="ghost"
            className="bg-[#E2F5F9] w-6 h-6"
          >
            <ChevronRight size={14} />
          </Button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-auto text-primary">
        <Button
          variant="outline"
          size="sm"
          onClick={() => alert("Chức năng đang được phát triển")}
        >
          View Detail
        </Button>
        <ShoppingCart size={20} className="cursor-pointer" />
      </div>
    </CardContent>
  </Card>
);
