import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
    Button,
    Container,
    InputField,
    Row,
    Stack,
} from "@yakad/ui";
import { revalidatePath } from "next/cache";
import { getTranslationText } from "../../translation_text";
import BackButton from "../../../../../(components)/BackButton";


export default async function Page(
    { params, searchParams }: { params: { uuid: string }, searchParams: { ayah_uuid: string, continue: string } }
) {

    const translation_text = await getTranslationText(params.uuid, searchParams.ayah_uuid);
    const url = decodeURIComponent(searchParams.continue);
    const urlWithoutParams = url.split("?")[0];
    return (
        <Container maxWidth="sm">
            <h1>Edit Text</h1>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";
                    await editText(params.uuid, searchParams.ayah_uuid, formData);

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

async function editText(translation_uuid: string, ayah_uuid: string, formData: FormData) {
    const text = {
        text: formData.get("text")?.toString()!,
    };

    const response = await fetch(`${process.env.API_URL}/translation/text/${translation_uuid}?ayah_uuid=${ayah_uuid}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: cookies().get("token")?.value || "none",
        },
        body: JSON.stringify(text),
    });

    if (response.status !== 200) {
        throw new Error(`You can't edit this translation text!, ${await response.text()}`);
    }
}

