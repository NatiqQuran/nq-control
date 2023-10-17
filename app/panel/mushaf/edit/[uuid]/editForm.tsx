"use client";

import { Button, Form, InputField, Row, Spacer } from "@yakad/ui";
import { useRouter } from "next/navigation";
import { useFetch, useForm } from "@yakad/lib";
import React from "react";
import { Mushaf } from "../../mushaf";

interface EditMushafParams {
    /**
     * Target mushaf uuid
     */
    uuid: string;

    /**
     * Target Mushaf Object
     * to show to the user when editing
     */
    mushaf: Mushaf;
}

export default function EditMushafForm({ uuid, mushaf }: EditMushafParams) {
    const router = useRouter();
    const [data, handle] = useForm<Mushaf>(mushaf);

    const editMushafFetch = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/mushaf/${uuid}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return (
        <Form onChange={handle} onSubmit={editMushafFetch.send}>
            <InputField
                variant="outlined"
                placeholder="Mushaf Name"
                type="string"
                name="name"
                value={data.name}
            />
            <p>The name of mushaf</p>
            <InputField
                variant="outlined"
                placeholder="Mushaf Source"
                type="string"
                name="source"
                value={data.source}
            />
            <p>The mushaf text source</p>
            <InputField
                variant="outlined"
                placeholder="Mushaf Bismillah Text"
                type="string"
                name="bismillah_text"
                value={data.bismillah_text || ""}
            />
            <p>Bismillah Text</p>
            <Row>
                <Spacer />
                <Button variant="outlined" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button
                    loadingVariant="spinner"
                    onClick={editMushafFetch.send}
                    variant="filled"
                    disabled={editMushafFetch.loading}
                >
                    Edit
                </Button>
            </Row>
        </Form>
    );
}
