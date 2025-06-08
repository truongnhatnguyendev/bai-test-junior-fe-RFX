import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userService } from "@/services/user/user.service";
import { useEffect, useState } from "react";

type SelectUserTypeProps = {
  onSelectUserType?: (userType: string) => void;
};

export function SelectUserType({ onSelectUserType }: SelectUserTypeProps) {
  const [userTypes, setUserTypes] = useState<
    { type: string; userId: string }[]
  >([]);
  useEffect(() => {
    const getListUser = async () => {
      try {
        const resp = await userService.getTypes();
        setUserTypes(resp);
      } catch (error: any) {
        throw new Error(error?.message);
      }
    };
    getListUser();
  }, []);
  const handleChange = (value: string) => {
    onSelectUserType?.(value);
  };
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="user type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>User type</SelectLabel>
          {userTypes?.map((user) => (
            <SelectItem key={user.userId} value={user.type}>
              {user.type}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
