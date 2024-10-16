
import React from "react";
import { Button, Container, InputField, Row, Stack } from "@yakad/ui";
import BackButton from "../../../(components)/BackButton";
import { controllerSurah } from "../../../connnection";
import { SurahViewRequestData } from "@ntq/sdk/build/interfaces/surah";
import { Period } from "@ntq/sdk/build/interfaces/utils";

export default function Page() {
    return (
        <Container maxWidth="sm">
            <h1>Add Surah</h1>

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

                    await controllerSurah.add(data, {});

                }}
            >
                <Stack>
                    <InputField
                        variant="outlined"
                        placeholder="Surah Name"
                        type="string"
                        name="name"
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Name Pronunciation"
                        type="string"
                        name="name_pronunciation"
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Name Transliteration"
                        type="string"
                        name="name_transliteration"
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Name Translation Phrase"
                        type="string"
                        name="name_translation_phrase"
                    />


                    <p>The name of surah</p>
                    <InputField
                        variant="outlined"
                        placeholder="Period"
                        type="string"
                        name="period"
                    />
                    <p>The surah is makki or madani</p>
                    <InputField
                        variant="outlined"
                        placeholder="Surah Number"
                        type="number"
                        name="number"
                    />
                    <p>The number of surah</p>
                    <InputField
                        variant="outlined"
                        placeholder="Mushaf uuid"
                        type="string"
                        name="mushaf_uuid"
                    />
                    <p>The mushaf id that we want add the surah</p>
                    <label>Bismillah status</label>
                    <input type="checkbox" name="bismillah_status" />

                    <label>Bismillah as first ayah</label>
                    <input type="checkbox" name="bismillah_as_first_ayah" />
                    <p>
                        The surah start with bismillah, start with bismillah as
                        first ayah or start without bismillah
                    </p>

                    <Row align="end">
                        <BackButton>Cancel</BackButton>
                        <Button>
                            Add
                        </Button>
                    </Row>
                </Stack>
            </form>
        </Container>
    );
}
