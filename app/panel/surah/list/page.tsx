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
} from "@yakad/ui";
import Link from "next/link";

interface SimpleSurah {
    name: string;
    period: string | null;
    number: number;
    number_of_ayahs: number;
    uuid: string;
}

async function getSurahsList(): Promise<SimpleSurah[]> {
    const response = await fetch(`${process.env.API_URL}/surah?mushaf=hafs`);

    return response.json();
}

export default async function Page() {
    const surahsList = await getSurahsList();

    return (
        <Container>
            <h1>Surah List</h1>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Surah Number</Th>
                        <Th>Surah Name</Th>
                        <Th>Number of Ayyahs</Th>
                        <Th>Period</Th>
                        <Th>More</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {surahsList.map((item) => (
                        <Tr>
                            <Td>{item.number}</Td>
                            <Td>{item.name}</Td>
                            <Td>{item.number_of_ayahs}</Td>
                            <Td>{item.period}</Td>
                            <Td>
                                <Row>
                                    <Link href={"/panel/surah/" + item.uuid}>
                                        <Button size="small" variant="link">
                                            View
                                        </Button>
                                    </Link>
                                    <Link
                                        href={"/panel/surah/edit/" + item.uuid}
                                    >
                                        <Button size="small" variant="link">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button size="small" variant="link">
                                        Delete
                                    </Button>
                                </Row>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Container>
    );
}
