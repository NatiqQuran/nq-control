import { cookies } from "next/headers";
import { Button, Container, InputField, Row, Stack } from "@yakad/ui";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import BackButton from "../../../../(components)/BackButton";

async function addPhrase(formData: FormData) {
    const phrase = {
        phrase: formData.get("phrase")?.toString()!,
    };

    const response = await fetch(`${process.env.API_URL}/phrase`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: cookies().get("token")?.value || "none",
        },
        body: JSON.stringify(phrase),
    });

    if (response.status !== 200) {
        throw new Error(`You can't add this phrase!, ${await response.text()}`);
    }
}

export default async function Page() {
    return (
        <Container maxWidth="sm">
            <h1>Add Phrase</h1>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";
                    await addPhrase(formData);

                    revalidatePath("/panel/phrase/list");
                    redirect("/panel/phrase/list");
                }}
            >
                <Stack>
                    <InputField
                        variant="outlined"
                        placeholder="Text"
                        type="string"
                        name="phrase"
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
