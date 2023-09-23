import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getUserProfile, UserProfile } from "../profile";
import EditProfileForm from "./editProfileForm";
import { Button, Container, Page, Stack } from "@yakad/ui";

export const runtime = "edge";

export default async function EditProfile() {
    const token = cookies().get("token")?.value || redirect("/account/login");

    const profile: UserProfile = await (async () => {
        const profileFromApi = await getUserProfile(token);

        return profileFromApi.status === 401
            ? redirect("/account/login")
            : profileFromApi.json();
    })();

    return (
        <Container maxWidth="xs">
            <EditProfileForm profile={profile} token={token} />
        </Container>
    );
}
