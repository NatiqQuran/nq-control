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
import del from "../../../../components/deleteButton";

export const dynamic = "force-dynamic";

interface ListSurah {
    uuid: string;
    name: string;
    number: number;
    number_of_ayahs: number;
    period: "makki" | "madani" | null;
}

async function getSurahsList(mushaf: string): Promise<ListSurah[]> {
    const response = await fetch(`${process.env.API_URL}/surah?mushaf=${mushaf}`);

    return response.json();
}

export default async function Page({ searchParams }: { searchParams: { mushaf: string } }) {
    const surahsList = await getSurahsList(searchParams.mushaf);

    return (
        <Container>
            <h1>Surah List</h1>
            <Table>
                <Thead style={{ textAlign: "justify" }}>
                    <Tr>
                        <Th>Surah Number</Th>
                        <Th>Surah Name</Th>
                        <Th>Number of Ayyahs</Th>
                        <Th>Period</Th>
                        <Th>More</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {surahsList.map((item, index) => (
                        <Tr key={index}>
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
                                    <Button
                                        onClick={async () => {
                                            "use server";
                                            await del("mushaf", item.uuid)
                                        }}>Delete</Button>
                                </Row>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Container>
    );
}
