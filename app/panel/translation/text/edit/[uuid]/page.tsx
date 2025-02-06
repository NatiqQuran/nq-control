import { redirect } from "next/navigation";
import { Button, Container, InputField, Row, Stack } from "@yakad/ui";
import { revalidatePath } from "next/cache";
import BackButton from "../../../../../(components)/BackButton";
import { controllerTranslation } from "../../../../../connnection";

export default async function Page({
    params,
    searchParams,
}: {
    params: { uuid: string };
    searchParams: { ayah_uuid: string; continue: string };
}) {
    const translation_text = (
        await controllerTranslation
            .text()
            .view(params.uuid, {
                params: { ayah_uuid: searchParams.ayah_uuid },
            })
    ).data;

    const url = decodeURIComponent(searchParams.continue);
    const urlWithoutParams = url.split("?")[0];
    return (
        <Container size="sm">
            <h1>Edit Text</h1>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";
                    const data = {
                        text: formData.get("text")?.toString()!,
                    };

                    await controllerTranslation
                        .text()
                        .modify(params.uuid, data, {
                            params: {
                                ayah_uuid: searchParams.ayah_uuid,
                            } as any,
                        });

                    revalidatePath(urlWithoutParams);
                    redirect(url);
                }}
            >
                <Stack>
                    <InputField
                        variant="outlined"
                        placeholder="Text"
                        type="string"
                        name="text"
                        defaultValue={translation_text.text}
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
