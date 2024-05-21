import { Button, Container, InputField, Row, Spacer, Stack } from "@yakad/ui";
import { Mushaf } from "../mushaf";
import { XbackButton } from "@yakad/x";
import { cookies } from "next/headers";

async function addMushaf(formData: FormData) {
    const requestBody: Mushaf = {
        name: formData.get("name")?.toString()!,
        short_name: formData.get("short_name")?.toString()!,
        source: formData.get("source")?.toString()!,
        bismillah_text: formData.get("bismillah_text")?.toString()!,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mushaf`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: cookies().get("token")?.value || "none",
        },
        body: JSON.stringify(requestBody),
    });

    if (response.status !== 200) {
        throw new Error(`Could't add new mushaf, ${await response.text()}`);
    }
}

export default function Page() {
    return (
        <Container maxWidth="sm">
            <h1>Add new Mushaf</h1>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";
                    await addMushaf(formData);
                }}
            >
                <Stack>
                    <InputField
                        variant="outlined"
                        placeholder="Mushaf Name"
                        type="string"
                        name="name"
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Mushaf short name"
                        type="string"
                        name="short_name"
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Mushaf Source"
                        type="string"
                        name="source"
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Bismillah text in Mushaf"
                        type="string"
                        name="bismillah_text"
                    />

                    <Row align="end">
                        <XbackButton>Cancel</XbackButton>
                        <Button loadingVariant="spinner" variant="filled">
                            Add
                        </Button>
                    </Row>
                </Stack>
            </form>
        </Container>
    );
}
