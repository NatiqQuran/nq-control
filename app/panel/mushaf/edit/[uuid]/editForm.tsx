"use client";

import { Button, Form, InputField, Row, Spacer } from "@yakad/ui";
import { useRouter } from "next/navigation";
import { useFetch, useForm } from "@yakad/lib";
import React, { useEffect } from "react";
import { Mushaf } from "../../mushaf";
import { ApiError, handle_fetch_error } from "../../../api";

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


    useEffect(() => {
        if (editMushafFetch.response && !editMushafFetch.response.ok) {
            throw new ApiError(editMushafFetch.response.status || 0)
        }
    }, [editMushafFetch.isResponseBodyReady]);

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
                    variant="filled"
                    disabled={editMushafFetch.loading}
                    onClick={editMushafFetch.send}
                >
                    Edit
                </Button>
            </Row>
        </Form>
    );
}
