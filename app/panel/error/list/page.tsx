import { cookies } from "next/headers";
import { Container, Row } from "@yakad/ui";
import { Xtable, XtColumn } from "@yakad/x";

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
                <h1>Errors list</h1>
            </Row>
            <Xtable data={errorsList}>
                <XtColumn
                    dataKey="id"
                    headTitle="ID"
                    footTitle="Sum:"
                    footFunc="sum"
                    alignText="center"
                    sortable
                />
                <XtColumn
                    dataKey="uuid"
                    headTitle="UUID"
                    footTitle="Sum:"
                    footFunc="sum"
                    sortable
                    searchable
                />
                <XtColumn
                    dataKey="status_code"
                    headTitle="Status Code"
                    footTitle="Sum:"
                    footFunc="sum"
                    alignText="center"
                />
                <XtColumn
                    dataKey="error_name"
                    headTitle="Name"
                    footTitle="Sum:"
                    footFunc="sum"
                    sortable
                    searchable
                />
                <XtColumn
                    dataKey="message"
                    headTitle="Message"
                    footTitle="Sum:"
                    footFunc="sum"
                    sortable
                    searchable
                />
                <XtColumn
                    dataKey="detail"
                    headTitle="Detail"
                    footTitle="Sum:"
                    footFunc="sum"
                    sortable
                    searchable
                />
            </Xtable>
        </Container>
    );
}
