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
import { cookies } from "next/headers";
import DeleteButton from "../../(components)/DeleteButton";

async function phrase_list() {
    const response = await fetch(
        `${process.env.API_URL}/phrase`,
        {
            headers: {
                Authorization: cookies().get("token")?.value || "none"
            }
        }
    );

    if (response.status !== 200) {
        throw new Error(`Could't get phrase's list, ${await response.text()}`);
    }

    return response.json();
}

export default async function Page() {
    const phrasesList: { language: string, status: string }[] = await phrase_list();

    return (
        <Container maxWidth="xl">
            <Row >
                <h1>Supported languages</h1>
                <Spacer />
                <Link href="/panel/app_translation/phrase/list">
                    <Button variant="filled">
                        Phrases
                    </Button>
                </Link>
            </Row>
            <Table>
                <Thead style={{ textAlign: "justify" }}>
                    <Tr>
                        <Th>language</Th>
                        <Th>status</Th>
                        <Th>More</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {phrasesList.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.language}</Td>
                            <Td>{item.status}</Td>
                            <Td>
                                <Row>
                                    <Link href={`/panel/app_translation/edit/${item.language}`}>
                                        <Button variant="link">Edit</Button>
                                    </Link>
                                </Row>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Container>

    );
}
