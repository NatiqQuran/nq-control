"use client";

import { useFetch, useForm } from "@yakad/lib";
import { Button, Form, Row } from "@yakad/ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserProfile } from "../profile";

export default function EditProfileForm({
    profile,
    token
}: {
    profile: UserProfile;
    token: string;
}) {
    const router = useRouter();
    const [data, handle] = useForm({
        first_name: profile.first_name,
        last_name: profile.last_name,
        birthday: profile.birthday,
        profile_image: profile.profile_image,
        username: profile.username
    });

    const fetch = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(data)
    });

    useEffect(() => {
        if (fetch.isResponseBodyReady && fetch.response.status === 200) {
            router.back();
        }
    }, [fetch.isResponseBodyReady]);

    return (
        <Form onChange={handle} onSubmit={fetch.send}>
            <input
                type="text"
                placeholder="username"
                name="username"
                value={data.username}
            />
            <input
                type="text"
                placeholder="first name"
                name="first_name"
                value={data.first_name}
            />
            <input
                type="text"
                placeholder="last name"
                name="last_name"
                value={data.last_name}
            />

            <input
                type="date"
                name="birthday"
                placeholder="birthday"
                value={data.birthday as string}
            />

            {/* This is only for test the real input must be a type of file */}
            <input
                type="text"
                name="profile_image"
                placeholder="profile image"
                value={data.profile_image!}
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
