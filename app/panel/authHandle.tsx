import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserProfile, UserProfile } from "./profile/profile";
export default async function handler() {
    const cookie = cookies();
    const token = cookie.get("token") || redirect("/account/login");

    const profile = await (async () => {
        const profileFromApi = await getUserProfile(token.value);

        return profileFromApi.status === 401
            ? redirect("/account/login")
            : profileFromApi.json();
    })();

    return <h1>from Auth</h1>;
}
