import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getUserProfile, UserProfile } from "./profile";
import EditProfileForm from "./editProfileForm";
import { Page } from "@yakad/ui";

export default async function EditProfile() {
    const token = cookies().get("token")?.value || redirect("/account/login");

    const profile: UserProfile = await (async () => {
        const profileFromApi = await getUserProfile(token);

        return profileFromApi.status === 401
            ? redirect("/account/login")
            : profileFromApi.json();
    })();

    return (
        <Page style={{ position: "absolute", padding: "10px", height: "100%" }}>
            <EditProfileForm profile={profile} token={token} />
        </Page>
    );
}
