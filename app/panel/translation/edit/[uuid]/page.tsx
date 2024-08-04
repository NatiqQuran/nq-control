
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
    Button,
    Chekbox,
    Container,
    InputField,
    Row,
    Stack,
} from "@yakad/ui";
import BackButton from "../../../../(components)/BackButton";
import { revalidatePath } from "next/cache";
import { getTranslation } from "../../translation";

async function editTranslation(uuid: string, formData: FormData) {
    const translation = {
        translator_account_uuid: formData.get("translator_account_uuid")?.toString() || null,
        language: formData.get("language")?.toString()!,
        source: formData.get("source")?.toString()!,
        completed: formData.get("completed")?.toString()! === "on"
            ? true
            : false,
    };

    const response = await fetch(`${process.env.API_URL}/translation/${uuid}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: cookies().get("token")?.value || "none",
        },
        body: JSON.stringify(translation),
    });

    if (response.status !== 200) {
        throw new Error(`You can't edit this translation!, ${await response.text()}`);
    }
}

export default async function Page({ params, searchParams }: { params: { uuid: string }, searchParams: { continue: string } }) {
    const translation = await getTranslation(params.uuid);
    const url = decodeURIComponent(searchParams.continue);
    const urlWithoutParams = url.split("?")[0];

    return (
        <Container maxWidth="sm">
            <h1>Edit Translation</h1>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";
                    await editTranslation(params.uuid, formData);

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
                        defaultValue={translation.translator_acccount_uuid}
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

                    <Chekbox
                        name="completed"
                        label="Completed"
                        checked={translation.completed}
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
