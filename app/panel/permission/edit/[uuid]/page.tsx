import { Button, Container, InputField, Row, Stack } from "@yakad/ui";
import React from "react";
import { cookies } from "next/headers";
import { Permission } from "../../list/page";
import BackButton from "../../../../(components)/BackButton";
import { redirect } from "next/navigation";

async function getPermission(uuid: string): Promise<Response> {
    const response = await fetch(`${process.env.API_URL}/permission/${uuid}`, {
        method: "GET",
        headers: {
            Authorization: cookies().get("token")?.value || "none",
        },
    });

    if (response.status !== 200) {
        throw new Error(`Can't view permission!, ${await response.text()}`);
    }

    return response;
}

async function editPermission(uuid: string, form: FormData) {
    const data: Permission = {
        action: form.get("action")?.toString()! as any,
        object: form.get("object")?.toString()!,
        subject: form.get("subject")?.toString()!,
        conditions: [],
    };

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/permission/${uuid}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: cookies().get("token")?.value || "none",
            },

            body: JSON.stringify(data),
        }
    );

    if (response.status !== 200) {
        throw new Error(`Can't edit permission!, ${await response.text()}`);
    }
}

export default async function EditPermission({
    params: { uuid },
}: {
    params: { uuid: string };
}) {
    const response = await getPermission(uuid);
    const permission: Permission = await response.json();

    return (
        <Container maxWidth="sm">
            <h1>Edit Permission</h1>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";
                    await editPermission(uuid, formData);

                    redirect("/panel/permission/list");
                }}
            >
                <Stack>
                    <InputField
                        placeholder="subject (user id)"
                        type="string"
                        name="subject"
                        defaultValue={permission.subject}
                    />

                    <InputField
                        placeholder="object (resource i.e organization)"
                        type="string"
                        name="object"
                        defaultValue={permission.object}
                    />

                    <label>Action: </label>

                    <select name="action">
                        <option value="create">Create</option>
                        <option value="view">View</option>
                        <option value="delete">Delete</option>
                        <option value="edit">Edit</option>
                    </select>

                    <Row align="end">
                        <BackButton>Cancel</BackButton>
                        <Button variant="filled">Edit</Button>
                    </Row>
                </Stack>
            </form>
        </Container>
    );
}
