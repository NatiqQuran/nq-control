import { Button, Container, InputField, Row, Stack } from "@yakad/ui";
import { cookies } from "next/headers";
import BackButton from "../../../(components)/BackButton";
import { redirect } from "next/navigation";
import { User } from "../user";

async function addUser(formData: FormData) {
    const requestBody: Omit<User, "uuid"> = {
        email: formData.get("primary_email")?.toString()!,
        profile_image: formData.get("profile_image")?.toString(),
        birthday: formData.get("birthday")?.toString()!,
        language: formData.get("language")?.toString()!,
        username: formData.get("username")?.toString()!,
        last_name: formData.get("last_name")?.toString()!,
        first_name: formData.get("last_name")?.toString()!,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: cookies().get("token")?.value || "none",
        },
        body: JSON.stringify(requestBody),
    });

    if (response.status !== 200) {
        throw new Error(`Could't add new user, ${await response.text()}`);
    }
}

export default async function Page() {
    return (
        <Container size="sm">
            <h1>Add new User</h1>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";
                    await addUser(formData);
                    redirect("/panel/user/list");
                }}
            >
                <Stack>
                    <InputField
                        variant="outlined"
                        placeholder="Username"
                        type="string"
                        name="username"
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Email"
                        type="string"
                        name="primary_email"
                    />
                    <InputField
                        variant="outlined"
                        placeholder="First Name"
                        type="string"
                        name="first_name"
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Last Name"
                        type="string"
                        name="last_name"
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Birthday"
                        type="string"
                        name="birthday"
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Profile Image"
                        type="string"
                        name="profile_image"
                    />

                    <InputField
                        variant="outlined"
                        placeholder="Language"
                        type="string"
                        name="language"
                    />

                    <Row align="end">
                        <BackButton>Cancel</BackButton>
                        <Button loadingvariant="spinner" variant="filled">
                            Add
                        </Button>
                    </Row>
                </Stack>
            </form>
        </Container>
    );
}
