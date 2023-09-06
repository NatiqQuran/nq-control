"use client";

import { useFetch, useFormDataHandle } from "@yakad/lib";
import { Button, Container, Form, Page } from "@yakad/ui";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Organization } from "../../../organization";

interface EditData {
    orgData: Organization;
    token: string;
    orgId: string;
}

export default function EditForm({ orgData, token, orgId }: EditData) {
    const router = useRouter();
    const [newOrgData, setNewOrgData] = React.useState<Organization>(orgData);

    const handler = useFormDataHandle(setNewOrgData);

    const fetch = useFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/organizations/${orgId}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(newOrgData),
        },
    );

    useEffect(() => {
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
            <Form onChange={handler.handle} onSubmit={fetch.send}>
                <input
                    type="text"
                    placeholder="username"
                    name="username"
                    value={newOrgData.username}
                />
                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={newOrgData.name}
                />
                <input
                    type="text"
                    placeholder="national id"
                    name="national_id"
                    value={newOrgData.national_id}
                />
                <input
                    type="date"
                    name="established_date"
                    placeholder="established date"
                    value={newOrgData.established_date as string}
                />

                {/* This is only for test the real input must be a type of file */}
                <input
                    type="text"
                    name="profile_image"
                    placeholder="profile image"
                    value={newOrgData.profile_image!}
                />
                <Button variant="tonal">edit</Button>
            </Form>
        </Container>
    );
}
