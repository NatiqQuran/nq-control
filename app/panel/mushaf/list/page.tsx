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
import DeleteButton from "../../../../components/deleteButton";

interface SimpleMushaf {
    name: string;
    source: string;
    uuid: string;
}

async function getMushafsList(): Promise<SimpleMushaf[]> {
    const response = await fetch(`${process.env.API_URL}/mushaf`);

    return response.json();
}

export default async function Page() {
    const mushafsList = await getMushafsList();

    return (
        <Container>
            <Row>
                <h1>Mushaf List</h1>
                <Spacer />
                <Link href={"/panel/mushaf/add"}>
                    <Button variant="outlined">Add Mushaf</Button>
                </Link>
            </Row>
            <Table>
                <Thead style={{ textAlign: "justify" }}>
                    <Tr>
                        <Th>Mushaf Name</Th>
                        <Th>Mushaf Source</Th>
                        <Th>Mushaf uuid</Th>
                        <Th>More</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {mushafsList.map((item) => (
                        <Tr>
                            <Td>{item.name}</Td>
                            <Td>{item.source}</Td>
                            <Td>{item.uuid}</Td>
                            <Td>
                                <Row>
                                    <Link href={"/panel/surah/list"}>
                                        <Button size="small" variant="link">
                                            Surahs
                                        </Button>
                                    </Link>
                                    <Link href={"/panel/mushaf/" + item.uuid}>
                                        <Button size="small" variant="link">
                                            View
                                        </Button>
                                    </Link>
                                    <Link
                                        href={"/panel/mushaf/edit/" + item.uuid}
                                    >
                                        <Button size="small" variant="link">
                                            Edit
                                        </Button>
                                    </Link>
                                    <DeleteButton
                                        controller="mushaf"
                                        uuid={item.uuid}
                                        name={item.name}
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
