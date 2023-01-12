"use client";

import { useFetch, useFormDataHandle } from "@yakad/lib";
import { InputField, Page, Form, Container, Button } from "@yakad/ui";
import React, { useEffect } from "react";

interface NewOrganization {
    /**
     * The username of org,
     * Other users can search,
     * or go to the profile of org
     * the backend identifies the org with this prop
     */
    username: string;

    /**
     * This prop is showen in the org profile,
     * this is usually the full name of the org,
     * or name that this org is known for
     */
    name: string;

    /**
     * National id of the org,
     * this can be a changed very often,
     * this value will verifyed, after the creator of the org
     * requested
     */
    nationalId: string;

    /**
     * EstablishedDate: The date of the foundation of the org,
     * the format supported from the backend: Y-MM-DD,
     * example : 1988-10-21
     */
    establishedDate: Date;

    /**
     * The profile of the org, that will
     * showen in the org profile
     */
    profileImage: string | null;
}

export default function AddNewOrgForm({ token }: { token: string }) {
    const [newOrgData, setNewOrgData] = React.useState<NewOrganization>();

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
