"use client";

import { useRouter } from "next/navigation";
import { useFetch, useForm } from "@yakad/lib";
import { InputField, Row, Form, Container, Button } from "@yakad/ui";
import React from "react";
import { Organization } from "../../organization";

export default function AddNewOrgForm({ token }: { token: string }) {
    const router = useRouter();

    const [data, handle] = useForm<Organization>();

    const fetch = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/organizations`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    });

    return (
        <Container maxWidth="xs">
            <h1>Add a new Organization</h1>
            <Form onChange={handle} onSubmit={fetch.send}>
                <InputField
                    type="text"
                    name="username"
                    placeholder="username"
                />
                <InputField type="text" placeholder="name" name="name" />
                <InputField
                    type="text"
                    placeholder="national id"
                    name="national_id"
                />
                <InputField
                    type="date"
                    name="established_date"
                    placeholder="established date"
                />

                {/* This is only for test the real input must be a type of file */}
                <InputField
                    type="text"
                    name="profile_image"
                    placeholder="profile image"
                />
                <Row style={{ justifyContent: "flex-end" }}>
                    <Button variant="outlined" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button variant="tonal">Add</Button>
                </Row>
            </Form>
            <h3>{fetch.response?.status === 200 ? "Created" : ""}</h3>
        </Container>
    );
}
