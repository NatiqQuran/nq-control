"use client";

import { useFetch, useFormDataHandle } from "@yakad/lib";
import { Form, Button, Row, Spacer } from "@yakad/ui";
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
        process.env.NEXT_PUBLIC_API_URL + "/account/verify",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    const resendFetch = useFetch(
        process.env.NEXT_PUBLIC_API_URL + "/account/sendCode",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: data.email }),
        }
    );

    useEffect(() => {
        if (fetch.isResponseBodyReady && fetch.response.status === 200) {
            document.cookie = `token=${fetch.responseBody}; Secure`;
            router.replace("/panel");
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
        <>
            <Form onChange={handler.handle} onSubmit={fetch.send}>
                <input name="code" type="number" placeholder="Code" />
            </Form>
            <Button
                loading
                onClick={fetch.send}
                variant="filled"
                disabled={fetch.loading}
                style={{ width: "100%", justifyContent: "center" }}
            >
                Verify
            </Button>

            <Row style={{ width: "100%" }}>
                <h4> Remaining time:{countDown.time}</h4>
                <Spacer />

                {countDown.isCountDownEnded ? (
                    <Button
                        variant="text"
                        disabled={resendFetch.loading}
                        onClick={resendFetch.send}
                        loading
                        loadingVariant="spinner"
                    >
                        Resend
                    </Button>
                ) : null}
            </Row>
            <Button>Get back</Button>
        </>
    );
}
