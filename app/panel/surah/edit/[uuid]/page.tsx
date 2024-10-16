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
import { controllerSurah } from "../../../../connnection";
import { SurahViewRequestData } from "@ntq/sdk/build/interfaces/surah";
import { Period } from "@ntq/sdk/build/interfaces/utils";

export default async function Page({ params, searchParams }: { params: { uuid: string }, searchParams: { continue: string } }) {
    const surah = (await controllerSurah.view(params.uuid, {})).data;
    const url = decodeURIComponent(searchParams.continue);
    const urlWithoutParams = url.split("?")[0];

    return (
        <Container maxWidth="sm">
            <h1>Edit Surah</h1>

            <form
                style={{ width: "100%" }}
                action={async (form) => {
                    "use server";

                    const data: SurahViewRequestData = {
                        name: form.get("name")?.toString()!,
                        number: parseInt(form.get("number")?.toString()!),
                        period: form.get("period")?.toString()! as Period,
                        mushaf_uuid: form.get("mushaf_uuid")?.toString()!,
                        bismillah_status: form.get("bismillah_status")?.toString()! === "on" ? true : false,
                        name_pronunciation: form.get("name_pronunciation")?.toString()!,
                        name_transliteration: form.get("name_transliteration")?.toString()!,
                        bismillah_as_first_ayah: form.get("bismillah_as_first_ayah")?.toString()! === "on" ? true : false,
                        name_translation_phrase: form.get("name_translation_phrase")?.toString()!
                    }

                    await controllerSurah.edit(params.uuid, data, {});
                    revalidatePath(urlWithoutParams);
                    redirect(url);
                }}
            >
                <Stack>
                    <InputField
                        variant="outlined"
                        placeholder="Surah Name"
                        type="string"
                        name="name"
                        defaultValue={surah.names[0].arabic}
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Period"
                        type="string"
                        name="period"
                        defaultValue={surah.period as any}
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Surah Number"
                        type="number"
                        name="number"
                        defaultValue={surah.number.toString()}
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Mushaf uuid"
                        type="string"
                        name="mushaf_uuid"
                        defaultValue={surah.mushaf.uuid}
                    />
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
                        <BackButton>Cancel</BackButton>
                        <Button variant="filled">Edit</Button>
                    </Row>
                </Stack>
            </form>
        </Container>
    );
}
