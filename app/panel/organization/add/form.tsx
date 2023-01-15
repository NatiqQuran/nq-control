"use client";

import { useFetch, useFormDataHandle } from "@yakad/lib";
import { InputField, Page, Form, Container, Button } from "@yakad/ui";
import React from "react";
import { Organization } from "../../organization";

export default function AddNewOrgForm({ token }: { token: string }) {
    const [newOrgData, setNewOrgData] = React.useState<Organization>();

    const handler = useFormDataHandle(setNewOrgData);

    const fetch = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/organizations`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
        },
        body: JSON.stringify(newOrgData),
    });

    return (
        <Page style={{ position: "absolute", padding: "10px", height: "100%" }}>
            <Container
                style={{
                    width: "25rem",
                }}
            >
                <h1>Add a new Organization :)</h1>
                <Form onChange={handler.handle} onSubmit={fetch.send}>
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
                    <Button variant="tonal">Add</Button>
                </Form>
                <h3>{fetch.response?.status === 200 ? "Created" : ""}</h3>
            </Container>
        </Page>
    );
}
