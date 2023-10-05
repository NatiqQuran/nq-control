"use client";

import { Button, Form, InputField, Row, Spacer } from "@yakad/ui";
import { useRouter } from "next/navigation";
import { useFetch, useFormDataHandle } from "@yakad/lib";
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
    const [formData, setFormData] = React.useState<Mushaf>(mushaf);

    const editMushafFetch = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/mushaf/${uuid}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const handler = useFormDataHandle(setFormData);

    return (
        <Form onChange={handler.handle} onSubmit={editMushafFetch.send}>
            <InputField
                variant="outlined"
                placeholder={mushaf.name}
                type="string"
                name="name"
            />
            <p>The name of mushaf</p>
            <InputField
                variant="outlined"
                placeholder={mushaf.source}
                type="string"
                name="source"
            />
            <p>The mushaf text source</p>
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
