import { Button, Container, InputField, Row, Stack } from "@yakad/ui";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Organization } from "../../../organization";
import { XbackButton } from "@yakad/x";

async function viewOrg(uuid: string, token: string) {
    const response = await fetch(`${process.env.API_URL}/organization/${uuid}`, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    });

    return response.json();
}

async function editOrg(token: string, uuid: string, formData: FormData) {
    const new_organization: Organization = {
        username: formData.get("username")?.toString()!,
        primary_name: formData.get("name")?.toString()!,
        profile_image: formData.get("profile_image")?.toString()!,
        national_id: formData.get("national_id")?.toString()!,
        established_date: formData.get("established_date")?.toString()!,
    };

    const response = await fetch(
        `${process.env.API_URL}/organizations/${uuid}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(new_organization),
        }
    );

    if (response.status !== 200) {
        throw new Error(
            `You can't edit this organization!, ${await response.text()}`
        );
    }
}

export default async function EditOrg({
    params: { orgId },
}: {
    params: { orgId: string };
}) {
    const token = cookies().get("token")?.value || redirect("/account/login");

    const currentOrgData = await viewOrg(orgId, token);
    const organization: Organization = {
        username: currentOrgData.username,
        primary_name: currentOrgData.name,
        profile_image: currentOrgData.profile_image,
        national_id: currentOrgData.national_id,
        established_date: currentOrgData.established_date,
    };

    return (
        <Container maxWidth="xs">
            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";
                    await editOrg(token, orgId, formData);
                    redirect("/panel");
                }}
            >
                <InputField
                    type="text"
                    placeholder="username"
                    name="username"
                    defaultValue={organization.username}
                />
                <InputField
                    type="text"
                    placeholder="name"
                    name="name"
                    defaultValue={organization.primary_name}
                />
                <InputField
                    type="text"
                    placeholder="national id"
                    name="national_id"
                    defaultValue={organization.national_id}
                />
                <InputField
                    type="date"
                    name="established_date"
                    placeholder="established date"
                    defaultValue={organization.established_date as string}
                />
                <Stack>
                    <InputField
                        type="text"
                        placeholder="username"
                        name="username"
                        defaultValue={organization.username}
                    />
                    <InputField
                        type="text"
                        placeholder="name"
                        name="name"
                        defaultValue={organization.primary_name}
                    />
                    <InputField
                        type="text"
                        placeholder="national id"
                        name="national_id"
                        defaultValue={organization.national_id}
                    />
                    <InputField
                        type="date"
                        name="established_date"
                        placeholder="established date"
                        defaultValue={organization.established_date as string}
                    />

                    {/* This is only for test the real input must be a type of file */}
                    <InputField
                        type="text"
                        name="profile_image"
                        placeholder="profile image"
                        defaultValue={organization.profile_image!}
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
