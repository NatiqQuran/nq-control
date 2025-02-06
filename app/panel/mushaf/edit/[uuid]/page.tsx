import { Button, Container, InputField, Row, Stack } from "@yakad/ui";
import React from "react";
import BackButton from "../../../../(components)/BackButton";
import { controllerMushaf } from "../../../../connnection";

export default async function EditMushaf({
    params: { uuid },
}: {
    params: { uuid: string };
}) {
    const mushaf = (await controllerMushaf.view(uuid, {})).data;

    return (
        <Container size="sm">
            <h1>Edit Mushaf</h1>
            <form
                style={{ width: "100%" }}
                action={async (form) => {
                    "use server";
                    const data = {
                        name: form.get("name")?.toString()!,
                        short_name: form.get("short_name")?.toString()!,
                        source: form.get("source")?.toString()!,
                        bismillah_text: form.get("bismillah_text")?.toString()!,
                    };

                    const response = await controllerMushaf.edit(
                        uuid,
                        data,
                        {}
                    );
                    if (response.status !== 200) {
                        throw new Error(`Can't edit mushaf!, ${response.data}`);
                    }
                }}
            >
                <Stack>
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
                    <Row align="end">
                        <BackButton>Cancel</BackButton>
                        <Button variant="filled">Edit</Button>
                    </Row>
                </Stack>
            </form>
        </Container>
    );
}
