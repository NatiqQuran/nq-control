"use client";
import { Button, Container, Row, Spacer } from "@yakad/ui";
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter();

    return (
        <Container>
            <h1>This page will be use for overview soon. </h1>
        </Container>
    );
}
