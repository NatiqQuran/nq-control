import { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import { cookies } from "next/headers";
import { Select, SelectProps } from "@yakad/ui";
import { User, getUserList } from "../panel/user/user";
import { getUserProfile } from "../panel/profile/profile";

export default async function UsersSelect(props: SelectProps) {
    const token = cookies().get("token")?.value || "none";
    const user_profile = await getUserProfile(token);
    const users: User[] = await getUserList(token);

    return (
        <Select {...props} defaultValue={user_profile.uuid}>
            {users.map((user, index) => {
                if (user_profile.uuid! == user.uuid!) {
                    return (
                        <option key={index} value={user.uuid}>
                            Me ({user.username})
                        </option>
                    );
                } else {
                    return (
                        <option key={index} value={user.uuid}>
                            {user.username}
                        </option>
                    );
                }
            })}
        </Select>
    );
}
