import { redirect } from "next/navigation";
import { Button, Container, InputField, Row, Stack } from "@yakad/ui";
import BackButton from "../../../../(components)/BackButton";
import { revalidatePath } from "next/cache";
import { controllerAyah } from "../../../../connnection";

export default async function Page({
    params,
    searchParams,
}: {
    params: { uuid: string };
    searchParams: { continue: string };
}) {
    const ayah = (await controllerAyah.view(params.uuid, {})).data;
    const url = decodeURIComponent(searchParams.continue);
    const urlWithoutParams = url.split("?")[0];

    return (
        <Container size="sm">
            <h1>Edit Ayah</h1>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";

                    const ayah = {
                        ayah_number: parseInt(
                            formData.get("ayah_number")?.toString()!
                        ),
                        sajdeh: formData.get("sajdeh")?.toString()!,
                    };

                    await controllerAyah.edit(params.uuid, ayah as any, {});

                    revalidatePath(urlWithoutParams);
                    redirect(url);
                }}
            >
                <Stack>
                    <InputField
                        variant="outlined"
                        placeholder="Ayah number"
                        type="string"
                        name="ayah_number"
                        defaultValue={ayah.ayah_number}
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Sajdeh"
                        type="string"
                        name="sajdeh"
                        defaultValue={"mostahab"}
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
