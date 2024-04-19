"use client";

import { Button, Container, Row } from "@yakad/ui";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error,
    reset: () => void
}) {
    return (
        <Container>
            <Row >
                <h1>{error.message}</h1>
                <Button onClick={reset} variant="filled">Retry</Button>
            </Row>
        </Container>
    );
}

