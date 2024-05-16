import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
    Button,
    Chekbox,
    Container,
    InputField,
    Row,
    Spacer,
    Stack,
} from "@yakad/ui";
import { XbackButton } from "@yakad/x";
import { Surah, SurahPeriod } from "../../surah";

async function getSurah(uuid: string): Promise<Surah> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/surah/${uuid}`
    );

    return response.json();
}

async function editSurah(uuid: string, formData: FormData) {
    const surah = {
        name: formData.get("name")?.toString() || "",
        uuid: uuid,
        mushaf_uuid: formData.get("mushaf_uuid")?.toString() || "",
        number: parseInt(formData.get("number")?.toString()!),
        period: (formData.get("period")?.toString()! as SurahPeriod) || null,
        //number_of_ayahs: parseInt(formData.get("number_of_ayahs")?.toString()!),
        bismillah_status:
            formData.get("bismillah_status")?.toString()! === "on"
                ? true
                : false,
        bismillah_as_first_ayah:
            formData.get("bismillah_as_first_ayah")?.toString()! === "on"
                ? true
                : false,
    };

    const response = await fetch(`${process.env.API_URL}/surah/${uuid}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: cookies().get("token")?.value || "none",
        },
        body: JSON.stringify(surah),
    });

    if (response.status !== 200) {
        throw new Error(`You can't edit this surah!, ${await response.text()}`);
    }
}

export default async function Page({ params }: { params: { uuid: string } }) {
    const surah = await getSurah(params.uuid);

    return (
        <Container maxWidth="sm">
            <h1>Edit Surah</h1>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";
                    await editSurah(params.uuid, formData);

                    redirect("/panel/mushaf/list");
                }}
            >
                <Stack>
                    <InputField
                        variant="outlined"
                        placeholder="Surah Name"
                        type="string"
                        name="name"
                        defaultValue={surah.surah_name}
                    />
                    <p>The name of surah</p>
                    <InputField
                        variant="outlined"
                        placeholder="Period"
                        type="string"
                        name="period"
                        defaultValue={surah.surah_period as any}
                    />
                    <p>The surah is makki or madani</p>
                    <InputField
                        variant="outlined"
                        placeholder="Surah Number"
                        type="number"
                        name="number"
                        defaultValue={surah.surah_number.toString()}
                    />
                    <p>The number of surah</p>
                    <InputField
                        variant="outlined"
                        placeholder="Mushaf uuid"
                        type="string"
                        name="mushaf_uuid"
                        defaultValue={surah.mushaf_uuid}
                    />
                    <p>The mushaf id that we want add the surah</p>
                    <Chekbox
                        label="Bismillah status"
                        name="bismillah_status"
                        checked={surah.bismillah_status}
                    />
                    <Chekbox
                        name="bismillah_as_first_ayah"
                        label="Bismillah as first ayah"
                        checked={surah.bismillah_as_first_ayah}
                    />
                    <p>
                        The surah start with bismillah, start with bismillah as
                        first ayah or start without bismillah
                    </p>
                    <Row align="end">
                        <XbackButton>Cancel</XbackButton>
                        <Button variant="filled">Edit</Button>
                    </Row>
                </Stack>
            </form>
        </Container>
    );
}
