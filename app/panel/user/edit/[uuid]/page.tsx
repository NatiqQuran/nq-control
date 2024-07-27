import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
    Button,
    Container,
    InputField,
    Row,
    Stack,
} from "@yakad/ui";
import BackButton from "../../../../(components)/BackButton";
import { revalidatePath } from "next/cache";
import { getUser } from "../../user";

async function editUser(uuid: string, formData: FormData) {
    let profile_image: string | null = formData.get("profile_image")?.toString()!
    if (profile_image === "") {
        profile_image = null;
    }
    const user = {
        username: formData.get("username")?.toString()!,
        first_name: formData.get("first_name")?.toString()!,
        last_name: formData.get("last_name")?.toString()!,
        birthday: formData.get("birthday")?.toString()!,
        language: formData.get("language")?.toString()!,
        profile_image: profile_image,
    };

    const response = await fetch(`${process.env.API_URL}/user/${uuid}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: cookies().get("token")?.value || "none",
        },
        body: JSON.stringify(user),
    });

    if (response.status !== 200) {
        throw new Error(`You can't edit this user!, ${await response.text()}`);
    }
}

export default async function Page({ params, searchParams }: { params: { uuid: string }, searchParams: { continue: string } }) {
    const user = await getUser(cookies().get("token")?.value || "none", params.uuid);
    const url = decodeURIComponent(searchParams.continue);
    const urlWithoutParams = url.split("?")[0];

    return (
        <Container maxWidth="sm">
            <h1>Edit User</h1>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";
                    await editUser(params.uuid, formData);

                    revalidatePath(urlWithoutParams);
                    redirect(url);
                }}
            >
                <Stack>
                    <InputField
                        type="text"
                        placeholder="username"
                        name="username"
                        defaultValue={user.username}
                    />
                    <InputField
                        type="text"
                        placeholder="first name"
                        name="first_name"
                        defaultValue={user.first_name}
                    />
                    <InputField
                        type="text"
                        placeholder="last name"
                        name="last_name"
                        defaultValue={user.last_name}
                    />

                    <InputField
                        type="date"
                        name="birthday"
                        placeholder="birthday"
                        defaultValue={user.birthday as string}
                    />
                    <InputField
                        type="text"
                        name="profile_image"
                        placeholder="profile image"
                        defaultValue={user.profile_image!}
                    />
                    <InputField
                        type="text"
                        name="language"
                        placeholder="language"
                        defaultValue={user.language!}
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
