"use client";

import { Button, Container, Form, InputField, Row, Spacer } from "@yakad/ui";
import { useRouter } from "next/navigation";
import { useFetch, useFormDataHandle } from "@yakad/lib";
import React from "react";
interface AddMushafData {
    name: string;
    source: string;
}

export default function Page() {
    const router = useRouter();
    const [formData, setFormData] = React.useState<AddMushafData>();

    const fetch = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/mushaf`, {
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
            <h1>Add new Mushaf</h1>

            <Form onChange={handler.handle} onSubmit={fetch.send}>
                <InputField
                    variant="outlined"
                    placeholder="Mushaf Name"
                    type="string"
                    name="mushaf name"
                />
                <p>The name of mushaf</p>
                <InputField
                    variant="outlined"
                    placeholder="Mushaf Source"
                    type="string"
                    name="mushaf source"
                />
                <p>The mushaf text source</p>
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
