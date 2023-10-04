"use client";

import { Button, Container, Form, InputField, Row, Spacer } from "@yakad/ui";
import { useRouter } from "next/navigation";
import { useFetch, useFormDataHandle } from "@yakad/lib";
import React from "react";
import { Surah } from "../surah";

export default function Page() {
    const router = useRouter();
    const [formData, setFormData] = React.useState<Surah>();

    const fetch = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/surah`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const handler = useFormDataHandle(setFormData);

    return (
        <Container maxWidth="sm">
            <h1>Add new Surah</h1>

            <Form onChange={handler.handle} onSubmit={fetch.send}>
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
                    placeholder="Mushaf id"
                    type="string"
                    name="mushaf_uuid"
                />
                <p>The mushaf id that we want add the surah</p>
                <InputField
                    variant="outlined"
                    placeholder="Bissmillah Status"
                    type="boolean"
                    name="bismillah_status"
                />
                <p>The surah bissmillah text</p>
                <InputField
                    variant="outlined"
                    placeholder="Bissmillah as first ayah"
                    type="string"
                    name="bismillah_as_first_ayah"
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
                        Add
                    </Button>
                </Row>
            </Form>
        </Container>
    );
}
