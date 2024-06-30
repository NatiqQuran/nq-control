import { Container, Table, Tbody, Td, Th, Thead, Tr, Row } from "@yakad/ui";
import { cookies } from "next/headers";

interface ErrorLog {
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
            <Table>
                <Thead style={{ textAlign: "justify" }}>
                    <Tr>
                        <Th>#</Th>
                        <Th>Status Code</Th>
                        <Th>Name</Th>
                        <Th>Message</Th>
                        <Th>Detail</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {errorsList.map((item, index) => (
                        <Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td>{item.status_code}</Td>
                            <Td>{item.error_name}</Td>
                            <Td>{item.message}</Td>
                            <Td>{item.detail}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Container>
    );
}
