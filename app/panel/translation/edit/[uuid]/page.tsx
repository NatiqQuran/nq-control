import { redirect } from "next/navigation";
import { Button, Container, InputField, Row, Stack } from "@yakad/ui";
import BackButton from "../../../../(components)/BackButton";
import { revalidatePath } from "next/cache";
import { controllerTranslation } from "../../../../connnection";

export default async function Page({
    params,
    searchParams,
}: {
    params: { uuid: string };
    searchParams: { continue: string };
}) {
    const translation = (await controllerTranslation.view(params.uuid, {}))
        .data;
    const url = decodeURIComponent(searchParams.continue);
    const urlWithoutParams = url.split("?")[0];

    return (
        <Container size="sm">
            <h1>Edit Translation</h1>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";

                    const translation = {
                        translator_account_uuid:
                            formData
                                .get("translator_account_uuid")
                                ?.toString() || null,
                        language: formData.get("language")?.toString()!,
                        source: formData.get("source")?.toString()!,
                        bismillah: formData.get("bismillah")?.toString()!,
                    };

                    await controllerTranslation.edit(
                        params.uuid,
                        translation as any,
                        {}
                    );

                    revalidatePath(urlWithoutParams);
                    redirect(url);
                }}
            >
                <Stack>
                    <InputField
                        variant="outlined"
                        placeholder="Translator Account UUID"
                        type="string"
                        name="translator_account_uuid"
                        defaultValue={translation.translator.account_uuid}
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Source"
                        type="string"
                        name="source"
                        defaultValue={translation.source}
                    />

                    <InputField
                        variant="outlined"
                        placeholder="Language"
                        type="string"
                        name="language"
                        defaultValue={translation.language}
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Bismillah"
                        type="string"
                        name="bismillah"
                        defaultValue={translation.bismillah}
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
