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
import { controllerSurah } from "../../../connnection";

export default async function SurahList({ mushaf, mushaf_uuid }: { mushaf: string, mushaf_uuid: string }) {
    const surahsList = (await controllerSurah.list({ params: { mushaf: mushaf } })).data;

    return (
        <Container maxWidth="xl">
            <Row>
                <h1>Surah List</h1>
                <Spacer />
                <Link href="/panel/surah/add">
                    <Button variant="outlined">Add surah</Button>
                </Link>
            </Row>
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
                            <Td>{item.names[0].arabic}</Td>
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
                                        href={`/panel/surah/edit/${item.uuid}?continue=${encodeURIComponent("/panel/mushaf/" + mushaf_uuid)}`}
                                    >
                                        <Button size="small" variant="link">
                                            Edit
                                        </Button>
                                    </Link>

                                    <DeleteButton
                                        pagePath="/panel/surah/list"
                                        controller="surah"
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
