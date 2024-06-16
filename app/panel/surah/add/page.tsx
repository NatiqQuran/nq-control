"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useFetch, useForm } from "@yakad/lib";
import { Button, Container, InputField, Row, Spacer, Stack } from "@yakad/ui";
import BackButton from "../../../(components)/BackButton";

export default function AddSurah() {
    const router = useRouter();

    const [data, handle] = useForm({
        name: null,
        mushaf_uuid: null,
        number: null,
        period: null,
        bismillah_status: null,
        bismillah_as_first_ayah: null,
    });

    const fetch = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/surah`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return (
        <Container maxWidth="sm">
            <h1>Add Surah</h1>

            <form
                style={{ width: "100%" }}
                onChange={handle}
                onSubmit={fetch.send}
            >
                <Stack>
                    <InputField
                        variant="outlined"
                        placeholder="Surah Name"
                        type="string"
                        name="name"
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
                        <Button
                            loadingVariant="spinner"
                            onClick={fetch.send}
                            variant="filled"
                            disabled={fetch.loading}
                        >
                            Add
                        </Button>
                    </Row>
                </Stack>
            </form>
        </Container>
    );
}
