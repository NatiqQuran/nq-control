import { cookies } from "next/headers";
import { getWord } from "../../word";
import { Button, Container, InputField, Row, Stack } from "@yakad/ui";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import BackButton from "../../../../(components)/BackButton";

async function editWord(uuid: string, formData: FormData) {
    const word = {
        word: formData.get("word")?.toString() || "",
    };

    const response = await fetch(`${process.env.API_URL}/word/${uuid}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: cookies().get("token")?.value || "none",
        },
        body: JSON.stringify(word),
    });

    if (response.status !== 200) {
        throw new Error(`You can't edit this word!, ${await response.text()}`);
    }
}

export default async function Page({ params, searchParams }: { params: { uuid: string }, searchParams: { continue: string } }) {
    const word = await getWord(params.uuid);
    const url = decodeURIComponent(searchParams.continue);
    const urlWithoutParams = url.split("?")[0];

    return (
        <Container maxWidth="sm">
            <h1>Edit Word</h1>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";
                    await editWord(params.uuid, formData);

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
                        defaultValue={word.word}
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
