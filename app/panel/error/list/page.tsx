import { cookies } from "next/headers";
import { Container, Row, Spacer } from "@yakad/ui";
import { Xtable } from "@yakad/x";

interface ErrorLogHead {
    id: string;
    uuid: string;
    error_name: string;
    status_code: string;
    message: string;
    detail?: string;
}
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
    const tableHead: ErrorLogHead = {
        id: "ID",
        uuid: "UUID",
        status_code: "Status Code",
        error_name: "Error Name",
        message: "Message",
        detail: "Detail",
    };

    const errorsList = await getErrorsList();

    return (
        <Container maxWidth="xl">
            <Row>
                <h1>Errors list</h1>
            </Row>
            <Xtable head={tableHead} data={errorsList} />
        </Container>
    );
}
