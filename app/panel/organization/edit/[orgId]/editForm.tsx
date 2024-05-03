"use client";

import { useFetch, useForm } from "@yakad/lib";
import { Button, Container, Form } from "@yakad/ui";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Organization } from "../../../organization";
import { ApiError } from "../../../api";

interface EditData {
    orgData: Organization;
    token: string;
    orgId: string;
}

export default function EditForm({ orgData, token, orgId }: EditData) {
    const router = useRouter();
    const [data, handle] = useForm<Organization>(orgData);

    const fetch = useFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token,
            },
            mode: "no-cors",
            body: JSON.stringify(data),
        }
    );

    useEffect(() => {
        if (fetch.response && !fetch.response.ok) {
            throw new ApiError(fetch.response.status || 0);
        }

        if (fetch.isResponseBodyReady && fetch.response.status === 200) {
            router.back();
        }
    }, [fetch.isResponseBodyReady]);

    return (
        <Container
            style={{
                width: "25rem",
            }}
        >
            <Form onChange={handle} onSubmit={fetch.send}>
                <input
                    type="text"
                    placeholder="username"
                    name="username"
                    value={data.username}
                />
                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={data.name}
                />
                <input
                    type="text"
                    placeholder="national id"
                    name="national_id"
                    value={data.national_id}
                />
                <input
                    type="date"
                    name="established_date"
                    placeholder="established date"
                    value={data.established_date as string}
                />

                {/* This is only for test the real input must be a type of file */}
                <input
                    type="text"
                    name="profile_image"
                    placeholder="profile image"
                    value={data.profile_image!}
                />
                <Button variant="tonal">edit</Button>
            </Form>
        </Container>
    );
}
