"use client";

import { Button, Card, Container, Row } from "@yakad/ui";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <Container size="md" align="center">
            <h1 style={{ color: "red", fontSize: "10rem" }}>Error</h1>
            <Row>
                <Card>
                    <h2>{error.message}</h2>
                    <h3>{error.digest}</h3>
                    <Button onClick={reset} variant="filled">
                        Retry
                    </Button>
                </Card>
            </Row>
        </Container>
    );
}
