"use client";

import { Stack, Button } from "@yakad/ui";
import Login from "./login";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    return (
        <Stack style={{ alignItems: "center" }}>
            <span>
                <h3>Enter email to SignIn or Register account. </h3>
            </span>

            <Login />
            <Button size="small" variant="text" onClick={() => router.back()}>
                Cancel
            </Button>
        </Stack>
    );
}
