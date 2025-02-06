import { cookies } from "next/headers";
import { Button, Container, InputField, Row, Stack } from "@yakad/ui";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import BackButton from "../../../(components)/BackButton";

async function addWord(ayah_uuid: string, formData: FormData) {
    const word = {
        ayah_uuid: ayah_uuid,
        word: formData.get("word")?.toString() || "",
    };

    const response = await fetch(`${process.env.API_URL}/word`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: cookies().get("token")?.value || "none",
        },
        body: JSON.stringify(word),
    });

    if (response.status !== 200) {
        throw new Error(`You can't add this word!, ${await response.text()}`);
    }
}

export default async function Page({
    searchParams,
}: {
    searchParams: { continue: string; ayah_uuid: string };
}) {
    const url = decodeURIComponent(searchParams.continue);
    const urlWithoutParams = url.split("?")[0];

    return (
        <Container size="sm">
            <h1>Add Word</h1>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";
                    await addWord(searchParams.ayah_uuid, formData);

                    revalidatePath(urlWithoutParams);
                    redirect(url);
                }}
            >
                <Stack>
                    <InputField
                        variant="outlined"
                        placeholder="Word Text"
                        type="string"
                        name="word"
                    />
                    <Row align="end">
                        <BackButton>Cancel</BackButton>
                        <Button variant="filled">Add</Button>
                    </Row>
                </Stack>
            </form>
        </Container>
    );
}
