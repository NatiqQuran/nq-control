"use client";

import { useFetch, useForm } from "@yakad/lib";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

interface VerifyData {
    email: string;
    code?: number;
}

export default function Verify() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || notFound();
    const [data, handle] = useForm<VerifyData>({ email: email });

    const fetch = useFetch<string>(
        `${process.env.NEXT_PUBLIC_API_URL}/account/verify`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    async function setCookie(token: string) {
        "use server";

        cookies().set("token", token);
    }

    useEffect(() => {
        if (fetch.isResponseBodyReady && fetch.response.status === 200) {
            setCookie(fetch.responseBody);
            router.replace("/panel")
        }
    }, [fetch.isResponseBodyReady]);

    return (
        <>
            <form
                onChange={handle}
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
