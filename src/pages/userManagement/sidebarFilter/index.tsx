import { SelectUserName } from "@/components/select/selectUserName";
import { SelectUserType } from "@/components/select/selectUserType";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { debounce } from "@/utils/debounce";
import { DeepPartial } from "@/utils/deepPartial";
import { Funnel } from "lucide-react";
import { useMemo, useState } from "react";

export interface valueFilterEntity {
  userName: string;
  userId: string;
  type: string;
  phone: string;
  email: string;
  status: string[];
}
interface FilterProps {
  onFilterChange: (filters: DeepPartial<valueFilterEntity>) => void;
}

export function SidebarFilter({ onFilterChange }: FilterProps) {
  const [valueFilters, setValueFilters] = useState<
    DeepPartial<valueFilterEntity>
  >({});

  const debouncedFilterChange = useMemo(
    () => debounce(onFilterChange, 900),
    [onFilterChange]
  );

  const handleInputChange = (key: keyof valueFilterEntity, value: string) => {
    const updated = { ...valueFilters, [key]: value };
    setValueFilters(updated);
    debouncedFilterChange(updated);
  };

  const handleSelectChange = (key: keyof valueFilterEntity, value: string) => {
    const updated = { ...valueFilters, [key]: value };
    setValueFilters(updated);
    onFilterChange(updated);
  };

  const handleStatusChange = (statusValue: string, checked: boolean) => {
    const currentStatus = valueFilters.status || [];
    const updatedStatus = checked
      ? [...currentStatus, statusValue]
      : currentStatus.filter((s) => s !== statusValue);

    const updated = { ...valueFilters, status: updatedStatus };
    setValueFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="w-[253px] flex flex-col  border-r p-4 space-y-4 bg-white">
      <div className="flex items-center justify-between border-b py-2">
        <h2 className="font-semibold text-gray-500">FILTER</h2>
        <Funnel size={16} className="text-gray-400" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>User name</Label>
        <SelectUserName
          onSelectUser={(value) => handleSelectChange("userName", value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>User ID</Label>
        <Input
          placeholder="User ID"
          onChange={(e) => handleInputChange("userId", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>User type</Label>
        <SelectUserType
          onSelectUserType={(value) => handleSelectChange("type", value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Phone number</Label>
        <Input
          placeholder="Phone number"
          onChange={(e) => handleInputChange("phone", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Email address</Label>
        <Input
          placeholder="Email address"
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700">Status</p>
        <div className="space-y-1 pl-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="all"
              onCheckedChange={(checked) =>
                handleStatusChange("all", Boolean(checked))
              }
            />
            <label htmlFor="all" className="text-sm">
              All
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              onCheckedChange={(checked) =>
                handleStatusChange("active", Boolean(checked))
              }
            />
            <label htmlFor="active" className="text-sm">
              Active
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inactive"
              onCheckedChange={(checked) =>
                handleStatusChange("inactive", Boolean(checked))
              }
            />
            <label htmlFor="inactive" className="text-sm">
              Inactive
            </label>
          </div>
        </div>
      </div>
      <div className="flex-1"></div>
      <div>
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => alert("Chức năng đang phát triển")}
        >
          Export data
        </Button>
      </div>
    </div>
  );
}
