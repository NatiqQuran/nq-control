import {
    Container,
    Button,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Row,
    Spacer,
} from "@yakad/ui";
import Link from "next/link";
import DeleteButton from "../../../(components)/DeleteButton";
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

    return response.json();
}

export default async function Page() {
    const errorsList = await getErrorsList();

    return (
        <Container>
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
