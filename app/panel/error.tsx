"use client";

import { Button, Card, Container, Row } from "@yakad/ui";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error,
    reset: () => void
}) {
    return (
        <Container style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <h1 style={{ color: "red", fontSize: "10rem" }}>Error</h1>
            <Row >
                <Card>
                    <h2>{error.message}</h2>
                    <Button onClick={reset} variant="filled">Retry</Button>
                </Card>
            </Row>
        </Container>
    );
}

