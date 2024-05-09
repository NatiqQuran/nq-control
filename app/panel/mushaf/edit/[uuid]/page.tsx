import { Button, Container, InputField, Row, Spacer } from "@yakad/ui";
import React from "react";
import { Mushaf } from "../../mushaf";
import { cookies } from "next/headers";
import { XbackButton } from "@yakad/x";

/**
 * Returns the Mushaf Object
 */
async function viewMushaf(uuid: string): Promise<Response> {
    const response = await fetch(`${process.env.API_URL}/mushaf/${uuid}`, {
        method: "GET",
    });

    if (response.status !== 200) {
        throw new Error("Can't view mushaf");
    }

    return response;
}

async function editMushaf(uuid: string, form: FormData) {
    const data: Mushaf = {
        name: form.get("name")?.toString()!,
        short_name: form.get("short_name")?.toString()!,
        source: form.get("source")?.toString()!,
        bismillah_text: form.get("bismillah_text")?.toString()!,
    };

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mushaf/${uuid}`,
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
        throw new Error(`Can't edit mushaf!, ${await response.text()}`);
    }
}

export default async function EditMushaf({
    params: { uuid },
}: {
    params: { uuid: string };
}) {
    const response = await viewMushaf(uuid);
    const mushaf: Mushaf = await response.json();

    return (
        <Container maxWidth="sm">
            <h1>Edit Mushaf</h1>
            <form
                action={async (formData) => {
                    "use server";

                    await editMushaf(uuid, formData);
                }}
            >
                <InputField
                    placeholder="Mushaf Name"
                    type="string"
                    name="name"
                    defaultValue={mushaf.name}
                />
                <InputField
                    placeholder="Mushaf Short name"
                    type="string"
                    name="short_name"
                    defaultValue={mushaf.short_name}
                />
                <InputField
                    placeholder="Mushaf Source"
                    type="string"
                    name="source"
                    defaultValue={mushaf.source}
                />
                <InputField
                    placeholder="Bismillah text in this Mushaf"
                    type="string"
                    name="bismillah_text"
                    defaultValue={mushaf.bismillah_text || ""}
                />
                <Row>
                    <Spacer />
                    <XbackButton>Cancel</XbackButton>
                    <Button variant="filled">Edit</Button>
                </Row>
            </form>
        </Container>
    );
}
