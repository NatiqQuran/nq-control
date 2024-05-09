import { Button, Container, InputField, Row, Spacer } from "@yakad/ui";
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
            "Authorization": cookies().get("token")?.value || "none",
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

            <form action={async (formData) => {
                "use server";
                await addMushaf(formData)
            }}>
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
                <p>The name of mushaf</p>
                <InputField
                    variant="outlined"
                    placeholder="Mushaf Source"
                    type="string"
                    name="source"
                />
                <p>The mushaf text source</p>
                <InputField
                    variant="outlined"
                    placeholder="Bismillah text"
                    type="string"
                    name="bismillah_text"
                />
                <p>The mushaf bismillah_text</p>
                <Row>
                    <Spacer />
                    <XbackButton>Cancel</XbackButton>
                    <Button
                        loadingVariant="spinner"
                        variant="filled"
                    >
                        Add
                    </Button>
                </Row>
            </form>
        </Container>
    );
}
