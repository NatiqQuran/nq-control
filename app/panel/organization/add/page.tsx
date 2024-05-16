import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button, Container, InputField, Row, Spacer, Stack } from "@yakad/ui";
import { XbackButton } from "@yakad/x";
import { Organization } from "../../organization";

async function addOrg(token: string, formData: FormData) {
    const new_organization: Organization = {
        username: formData.get("username")?.toString()!,
        name: formData.get("name")?.toString()!,
        profile_image: formData.get("profile_image")?.toString()!,
        national_id: formData.get("national_id")?.toString()!,
        established_date: formData.get("established_date")?.toString()!,
    };

    const response = await fetch(`${process.env.API_URL}/organization`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(new_organization),
    });

    if (response.status !== 200) {
        throw new Error(
            `Could't create Organization!, ${await response.text()}`
        );
    }
}

export default function Page() {
    const token = cookies().get("token")?.value || redirect("/account/login");

    return (
        <Container maxWidth="xs">
            <h1>Add a new Organization</h1>
            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";
                    await addOrg(token, formData);
                    redirect("/panel/account");
                }}
            >
                <Stack>
                    <InputField
                        type="text"
                        name="username"
                        placeholder="username"
                    />
                    <InputField type="text" placeholder="name" name="name" />
                    <InputField
                        type="text"
                        placeholder="national id"
                        name="national_id"
                    />
                    <InputField
                        type="date"
                        name="established_date"
                        placeholder="established date"
                    />

                    {/* This is only for test the real input must be a type of file */}
                    <InputField
                        type="text"
                        name="profile_image"
                        placeholder="profile image"
                    />
                    <Row align="end">
                        <XbackButton>Cancel</XbackButton>
                        <Button variant="filled">Edit</Button>
                    </Row>
                </Stack>
            </form>
        </Container>
    );
}
