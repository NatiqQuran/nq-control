"use client";

import { useFetch } from "@yakad/lib";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout({ token }: { token: string }) {
    const router = useRouter();
    const fetch = useFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/account/logout`,
        {
            method: "GET",
            headers: {
                Authorization: token,
            },
        },
    );

    useEffect(() => {
        // Check if logout was succesful
        if (fetch.response && fetch.response.status === 200) {
            router.push("/login");
        }
    }, [fetch.isResponseBodyReady]);

    return <button onClick={fetch.send}>Logout</button>;
}
