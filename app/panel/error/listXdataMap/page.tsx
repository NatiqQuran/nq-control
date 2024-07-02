import { cookies } from "next/headers";
import { Container, Row } from "@yakad/ui";
import { XdataMap } from "@yakad/x";

interface ErrorLog {
    id: number;
    uuid: string;
    error_name: string;
    status_code: number;
    message: string;
    detail?: string;
}

async function getErrorsList(): Promise<ErrorLog[]> {
    const response = await fetch(`${process.env.API_URL}/error`, {
        headers: {
            Authorization: cookies().get("token")?.value || "",
        },
    });

    if (response.status !== 200) {
        throw new Error(
            `Coudn't get list of errors!, ${await response.text()}`
        );
    }

    return response.json();
}

export default async function Page() {
    const errorsList = await getErrorsList();

    return (
        <Container maxWidth="xl">
            <Row>
                <h1>Errors list by XdataMap</h1>
            </Row>
            <XdataMap data={errorsList} />
        </Container>
    );
}
