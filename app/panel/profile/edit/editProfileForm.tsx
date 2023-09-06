"use client";

import { useFetch, useFormDataHandle } from "@yakad/lib";
import { Button, Form, Row } from "@yakad/ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserProfile } from "../profile";

export default function EditProfileForm({
    profile,
    token
}: {
    profile: UserProfile;
    token: string;
}) {
    const router = useRouter();
    const [newUserProfile, setNewUserProfile] = useState({
        first_name: profile.first_name,
        last_name: profile.last_name,
        birthday: profile.birthday,
        profile_image: profile.profile_image,
        username: profile.username
    });

    const handler = useFormDataHandle(setNewUserProfile);

    const fetch = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(newUserProfile)
    });

    useEffect(() => {
        if (fetch.isResponseBodyReady && fetch.response.status === 200) {
            router.back();
        }
    }, [fetch.isResponseBodyReady]);

    return (
        <Form onChange={handler.handle} onSubmit={fetch.send}>
            <input
                type="text"
                placeholder="username"
                name="username"
                value={newUserProfile.username}
            />
            <input
                type="text"
                placeholder="first name"
                name="first_name"
                value={newUserProfile.first_name}
            />
            <input
                type="text"
                placeholder="last name"
                name="last_name"
                value={newUserProfile.last_name}
            />

            <input
                type="date"
                name="birthday"
                placeholder="birthday"
                value={newUserProfile.birthday as string}
            />

            {/* This is only for test the real input must be a type of file */}
            <input
                type="text"
                name="profile_image"
                placeholder="profile image"
                value={newUserProfile.profile_image!}
            />
            <Row style={{ justifyContent: "flex-end" }}>
                <Button variant="outlined" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button variant="filled">edit</Button>
            </Row>
        </Form>
    );
}
