import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getUserProfile, UserProfile } from "../profile";
import { Button, Container, InputField, Row, Stack } from "@yakad/ui";
import BackButton from "../../../(components)/BackButton";

async function editProfile(token: string, formData: FormData) {
    let profile_image: string | null = formData
        .get("profile_image")
        ?.toString()!;
    if (profile_image === "") {
        profile_image = null;
    }
    const profile = {
        username: formData.get("username")?.toString()!,
        first_name: formData.get("first_name")?.toString()!,
        last_name: formData.get("last_name")?.toString()!,
        birthday: formData.get("birthday")?.toString()!,
        profile_image: profile_image,
        email: formData.get("email")?.toString()!,
        language: formData.get("language")?.toString()!,
    };

    const response = await fetch(`${process.env.API_URL}/profile`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(profile),
    });

    if (response.status !== 200) {
        throw new Error(`Can't edit you profile!, ${await response.text()}`);
    }
}

export default async function EditProfile() {
    const token = cookies().get("token")?.value || redirect("/account/login");

    const profile: UserProfile = await getUserProfile(token);

    return (
        <Container size="xs">
            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";
                    await editProfile(token, formData);

                    redirect("/panel/account");
                }}
            >
                <Stack>
                    <InputField
                        type="text"
                        placeholder="username"
                        name="username"
                        defaultValue={profile.username}
                    />
                    <InputField
                        type="text"
                        placeholder="first name"
                        name="first_name"
                        defaultValue={profile.first_name}
                    />
                    <InputField
                        type="text"
                        placeholder="last name"
                        name="last_name"
                        defaultValue={profile.last_name}
                    />

                    <InputField
                        type="date"
                        name="birthday"
                        placeholder="birthday"
                        defaultValue={profile.birthday as string}
                    />
                    <InputField
                        type="text"
                        name="profile_image"
                        placeholder="profile image"
                        defaultValue={profile.profile_image!}
                    />
                    <InputField
                        type="text"
                        name="language"
                        placeholder="language"
                        defaultValue={profile.language!}
                    />
                    <Row align="end">
                        <BackButton>Cancel</BackButton>
                        <Button variant="filled">Edit</Button>
                    </Row>
                </Stack>
            </form>
        </Container>
    );
}
