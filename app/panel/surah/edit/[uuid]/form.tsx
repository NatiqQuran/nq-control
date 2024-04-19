"use client";

import { Button, Container, Form, InputField, Row, Spacer } from "@yakad/ui";
import { useRouter } from "next/navigation";
import { useFetch, useForm } from "@yakad/lib";
import React, { useEffect } from "react";
import { Surah } from "../../surah";
import { ApiError } from "../../../api";

export default function EditSurahForm({ surah, uuid }: { uuid: string, surah: Surah }) {
    const router = useRouter();

    const [data, handle] = useForm({
        name: surah.surah_name,
        mushaf_uuid: surah.mushaf_uuid,
        number: surah.surah_number,
        period: surah.surah_period,
        bismillah_status: surah.bismillah_status,
        bismillah_as_first_ayah: surah.bismillah_as_first_ayah
    });

    const fetch = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/surah/${uuid}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(data),
    });

    useEffect(() => {
        if (fetch.isResponseBodyReady && fetch.response) {
            if (!fetch.response.ok) {
                throw new ApiError(fetch.response.status || 0)
            }
            router.back();
            router.refresh();
        }
    }, [fetch.isResponseBodyReady]);


    return (
        <Container maxWidth="sm">
            <h1>Edit Surah</h1>

            <Form onChange={handle} onSubmit={fetch.send}>
                <InputField
                    variant="outlined"
                    placeholder="Surah Name"
                    type="string"
                    name="name"
                    value={data.name}
                />
                <p>The name of surah</p>
                <InputField
                    variant="outlined"
                    placeholder="Period"
                    type="string"
                    name="period"
                    value={data.period as any}
                />
                <p>The surah is makki or madani</p>
                <InputField
                    variant="outlined"
                    placeholder="Surah Number"
                    type="number"
                    name="number"
                    value={data.number.toString()}
                />
                <p>The number of surah</p>
                <InputField
                    variant="outlined"
                    placeholder="Mushaf uuid"
                    type="string"
                    name="mushaf_uuid"
                    value={data.mushaf_uuid}
                />
                <p>The mushaf id that we want add the surah</p>
                <label>Bismillah status</label>
                <input
                    type="checkbox"
                    name="bismillah_status"
                    checked={data.bismillah_status}
                />

                <label>Bismillah as first ayah</label>
                <input
                    type="checkbox"
                    name="bismillah_as_first_ayah"
                    checked={data.bismillah_as_first_ayah}
                />
                <p>
                    The surah start with bismillah, start with bismillah as
                    first ayah or start without bismillah
                </p>
                <Row>
                    <Spacer />
                    <Button variant="outlined" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button
                        loadingVariant="spinner"
                        onClick={fetch.send}
                        variant="filled"
                        disabled={fetch.loading}
                    >
                        Edit
                    </Button>
                </Row>
            </Form>
        </Container>
    );
}
