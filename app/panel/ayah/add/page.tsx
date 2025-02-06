import { Button, Container, InputField, Row, Select, Stack } from "@yakad/ui";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import BackButton from "../../../(components)/BackButton";
import { controllerAyah } from "../../../connnection";

export default async function Page({
    searchParams,
}: {
    searchParams: { continue: string; surah_uuid: string };
}) {
    const url = decodeURIComponent(searchParams.continue);
    const urlWithoutParams = url.split("?")[0];

    return (
        <Container size="sm">
            <h1>Add Ayah</h1>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";
                    const sajdeh = formData.get("sajdeh")?.toString()!;

                    const ayah = {
                        surah_uuid: searchParams.surah_uuid,
                        sajdeh: sajdeh === "none" ? null : sajdeh,
                        text: formData.get("text")?.toString()!,
                    };

                    await controllerAyah.add(ayah as any, {});

                    revalidatePath(urlWithoutParams);
                    redirect(url);
                }}
            >
                <Stack>
                    <Select name="sajdah" placeholder="Sajdah">
                        <option value="none">None</option>
                        <option value="mostahab">Mostahab</option>
                        <option value="vajib">Vajib</option>
                    </Select>

                    <InputField
                        variant="outlined"
                        placeholder="Text"
                        type="string"
                        name="text"
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
