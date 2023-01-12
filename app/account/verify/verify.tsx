"use client";

import { useFetch, useFormDataHandle } from "@yakad/lib";
import { Stack, Form, Button, Row, Spacer, CodeField } from "@yakad/ui";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import useCountDown from "./useCountdown";

interface VerifyData {
    email: string;
    code?: number;
}

export default function Verify() {
    const router = useRouter();
    const countDown = useCountDown(10);

    const searchParams = useSearchParams();
    const email = searchParams.get("email") || notFound();

    const [data, setData] = React.useState<VerifyData>({ email: email });

    const handler = useFormDataHandle(setData);

    const fetch = useFetch<string>(
        `${process.env.NEXT_PUBLIC_API_URL}/account/verify`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        },
    );

    const resendFetch = useFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/account/sendCode`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: data.email }),
        },
    );

    useEffect(() => {
        if (fetch.isResponseBodyReady && fetch.response.status === 200) {
            document.cookie = `token=${fetch.responseBody}; Secure`;
            (async () => router.replace("/panel"))();
        }
    }, [fetch.isResponseBodyReady]);

    useEffect(() => {
        if (
            resendFetch.isResponseBodyReady &&
            resendFetch.response.status === 200
        ) {
            countDown.resetTime();
        }
    }, [resendFetch.isResponseBodyReady]);

    return (
        <Stack style={{ alignItems: "center" }}>
            <Stack style={{ width: "100%", gap: "0" }}>
                <h1>Enter your code</h1>
                <span style={{ color: "#7d7d7d", fontSize: "1.2rem" }}>
                    We sended a code to your email.
                </span>
            </Stack>

            <Form
                onChange={handler.handle}
                onSubmit={fetch.send}
                style={{ alignItems: "center" }}
            >
                <CodeField type="number" length={6} name="code" />
            </Form>
            <Spacer />
            <Button
                loading
                onClick={fetch.send}
                variant="filled"
                disabled={fetch.loading}
                style={{ width: "100%", justifyContent: "center" }}
            >
                Verify
            </Button>

            <Button
                size="small"
                variant="tonal"
                onClick={resendFetch.send}
                loading={countDown.isCountDownEnded}
                loadingVariant="spinner"
                disabled={resendFetch.loading || !countDown.isCountDownEnded}
            >
                {countDown.isCountDownEnded
                    ? "Resend code"
                    : `Resend in: ${countDown.time}`}
            </Button>

            <Button size="small" variant="text" onClick={() => router.back()}>
                Get back
            </Button>
        </Stack>
    );
}
