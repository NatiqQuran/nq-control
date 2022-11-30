"use client";

import React, { useEffect } from "react";
import { useFetch, useFormDataHandle } from "@yakad/lib";
import { useRouter } from "next/navigation";

interface SendCodeData {
    email: string;
}

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = React.useState<SendCodeData>();

    const fetch = useFetch(
        process.env.NEXT_PUBLIC_API_URL + "/account/sendCode",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }
    );

    const handler = useFormDataHandle(setFormData);

    useEffect(() => {
        if (fetch.isResponseBodyReady && fetch.response.status === 200) {
            router.replace(`/verify?email=${formData?.email}`);
        }
    }, [fetch.isResponseBodyReady]);

    return (
        <>
            {fetch.loading ? "loading..." : ""}
            <form
                onChange={handler.handle}
                onSubmit={(e) => {
                    e.preventDefault();
                    fetch.send();
                }}
            >
                <input name="email" type="email" />
                <input type="submit" />
            </form>
        </>
    );
}
