"use client";

import { Button, Card, Container, Row } from "@yakad/ui";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <Container align="center" maxWidth="sm">
            <h1 style={{ color: "red", fontSize: "10rem" }}>Error</h1>
            <Card>
                <h2>{error.message}</h2>
                <Button onClick={reset} variant="filled">
                    Retry
                </Button>
            </Card>
        </Container>
    );
}
