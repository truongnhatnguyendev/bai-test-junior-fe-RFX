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

type SelectUserNameProps = {
  onSelectUser?: (userId: string) => void;
};

export function SelectUserName({ onSelectUser }: SelectUserNameProps) {
  const [userNames, setUserNames] = useState<
    { userName: string; userId: string }[]
  >([]);

  useEffect(() => {
    const getListUsers = async () => {
      try {
        const resp = await userService.getUserNames();
        setUserNames(resp);
      } catch (error: any) {
        throw new Error(error?.message);
      }
    };
    getListUsers();
  }, []);

  const handleChange = (value: string) => {
    onSelectUser?.(value);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="user name" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>User name</SelectLabel>
          {userNames.map((user) => (
            <SelectItem key={user.userId} value={user.userName}>
              {user.userName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
