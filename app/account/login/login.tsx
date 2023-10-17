"use client";

import React, { useEffect } from "react";
import { useFetch, useForm } from "@yakad/lib";
import { InputField, Button, Form } from "@yakad/ui";
import { useRouter } from "next/navigation";

interface SendCodeData {
    email: string;
}

export default function Login() {
    const router = useRouter();
    const [data, handle] = useForm<SendCodeData>();

    const fetch = useFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/account/sendCode`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    useEffect(() => {
        if (fetch.isResponseBodyReady && fetch.response.status === 200) {
            router.replace(`/account/verify?email=${data?.email}`);
        }
    }, [fetch.isResponseBodyReady]);

    return (
        <>
            <Form onChange={handle} onSubmit={fetch.send}>
                <InputField
                    variant="outlined"
                    placeholder="Email"
                    type="email"
                    name="email"
                />
            </Form>
            <Button
                loadingVariant="spinner"
                onClick={fetch.send}
                variant="filled"
                style={{ width: "100%", justifyContent: "center" }}
                disabled={fetch.loading}
            >
                Submit
            </Button>
        </>
    );
}
