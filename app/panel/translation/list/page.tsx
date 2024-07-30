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

interface SimpleTranslation {
    uuid: string;
    language: string;
    release_date: string;
    source: string;
    completed: boolean;
}

async function getTranslationsList(): Promise<SimpleTranslation[]> {
    const response = await fetch(`${process.env.API_URL}/translation?mushaf=hafs`);

    return response.json();
}

export default async function Page() {
    const translationsList = await getTranslationsList();

    return (
        <Container maxWidth="xl">
            <Row>
                <h1>Translation List</h1>
                <Spacer />
                <Link href={"/panel/translation/add"}>
                    <Button variant="outlined">Add Translation</Button>
                </Link>
            </Row>
            <Table>
                <Thead style={{ textAlign: "justify" }}>
                    <Tr>
                        <Th>UUID</Th>
                        <Th>Language</Th>
                        <Th>Release date</Th>
                        <Th>Source</Th>
                        <Th>Completed</Th>
                        <Th>More</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {translationsList.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.uuid}</Td>
                            <Td>{item.language}</Td>
                            <Td>{item.release_date}</Td>
                            <Td>{item.source}</Td>
                            <Td style={{ fontSize: "30px", display: "flex", justifyContent: "center" }}>{item.completed ? "✓" : "✕"}</Td>
                            <Td>
                                <Row>
                                    <Link href={"/panel/translation/" + item.uuid}>
                                        <Button size="small" variant="link">
                                            View
                                        </Button>
                                    </Link>
                                    <Link
                                        href={`/panel/translation/edit/${item.uuid}?continue=${encodeURIComponent('/panel/translation/list')}`}
                                    >
                                        <Button size="small" variant="link">
                                            Edit
                                        </Button>
                                    </Link>

                                    <DeleteButton
                                        pagePath="/panel/translation/list"
                                        controller="translation"
                                        uuid={item.uuid}
                                        variant="link"
                                        size="small"
                                    />
                                </Row>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Container>
    );
}
