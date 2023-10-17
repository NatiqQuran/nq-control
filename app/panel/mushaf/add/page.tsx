"use client";

import { Button, Container, Form, InputField, Row, Spacer } from "@yakad/ui";
import { useRouter } from "next/navigation";
import { useFetch, useForm } from "@yakad/lib";
import React from "react";
import { Mushaf } from "../mushaf";

export default function Page() {
    const router = useRouter();
    const [data, handle] = useForm<Mushaf>();

    const fetch = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/mushaf`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return (
        <Container maxWidth="sm">
            <h1>Add new Mushaf</h1>

            <Form onChange={handle} onSubmit={fetch.send}>
                <InputField
                    variant="outlined"
                    placeholder="Mushaf Name"
                    type="string"
                    name="name"
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
