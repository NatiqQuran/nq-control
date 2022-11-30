"use client";

import { useFetch, useFormDataHandle } from "@yakad/lib";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";

interface VerifyData {
    email: string;
    code?: number;
}

export default function Verify() {
    const router = useRouter();
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

    useEffect(() => {
        if (fetch.isResponseBodyReady && fetch.response.status === 200) {
            document.cookie = `token=${fetch.responseBody}; Secure`;
            router.replace("/panel");
        }
    }, [fetch.isResponseBodyReady]);

    return (
        <>
            <form
                onChange={handler.handle}
                onSubmit={(e) => {
                    e.preventDefault();
                    fetch.send();
                }}
            >
                <input name="code" type="number" placeholder="Code" />
                <input type="submit" value="Verify" />
            </form>
        </>
    );
}
