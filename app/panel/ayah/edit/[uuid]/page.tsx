import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
    Button,
    Container,
    InputField,
    Row,
    Stack,
} from "@yakad/ui";
import BackButton from "../../../../(components)/BackButton";
import { revalidatePath } from "next/cache";
import { getAyah } from "../../ayah";

async function editAyah(uuid: string, formData: FormData) {
    const ayah = {
        ayah_number: parseInt(formData.get("ayah_number")?.toString()!),
        sajdeh: formData.get("sajdeh")?.toString()!
    };

    const response = await fetch(`${process.env.API_URL}/ayah/${uuid}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: cookies().get("token")?.value || "none",
        },
        body: JSON.stringify(ayah),
    });

    if (response.status !== 200) {
        throw new Error(`You can't edit this ayah!, ${await response.text()}`);
    }
}

export default async function Page({ params, searchParams }: { params: { uuid: string }, searchParams: { continue: string } }) {
    const ayah = await getAyah(params.uuid);
    const url = decodeURIComponent(searchParams.continue);
    const urlWithoutParams = url.split("?")[0];

    return (
        <Container maxWidth="sm">
            <h1>Edit Surah</h1>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";
                    await editAyah(params.uuid, formData);

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
                    <p>Ayah number</p>
                    <InputField
                        variant="outlined"
                        placeholder="Sajdeh"
                        type="string"
                        name="sajdeh"
                        defaultValue={"mostahab"}
                    />
                    <p>Sajdeh</p>
                    <Row align="end">
                        <BackButton>Cancel</BackButton>
                        <Button variant="filled">Edit</Button>
                    </Row>
                </Stack>
            </form>
        </Container>
    );
}
