"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@yakad/ui";
import { ButtonProps } from "@yakad/ui";

export default function BackButton(props: ButtonProps) {
    const router = useRouter();

    return (
        <Button type="button" {...props} onClick={() => router.back()}>
            {props.children ? props.children : "back"}
        </Button>
    );
}
