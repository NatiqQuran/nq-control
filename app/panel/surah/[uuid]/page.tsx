import { Button, Container, Hr, Row, Spacer, Table, Tbody, Td, Th, Thead, Tr } from "@yakad/ui";
import { XdataMap } from "@yakad/x";
import Link from "next/link";
import DeleteButton from "../../../(components)/DeleteButton";

interface SimpleSurah {
    mushaf_uuid: string;
    mushaf_name: string;
    surah_uuid: string;
    surah_name: string;
    surah_period: string;
    surah_number: number;
    bismillah_status: boolean;
    bismillah_as_first_ayah: boolean;
    number_of_ayahs: string;

    ayahs: {
        number: number;
        uuid: string;
        sajdeh: string;
        content: { text: string };
    }[];
}

async function getSurah(uuid: string): Promise<SimpleSurah> {
    const response = await fetch(
        `${process.env.API_URL}/surah/${uuid}?mushaf=hafs`
    );

    return response.json();
}

export default async function ViewSurah({
    params,
}: {
    params: { uuid: string };
}) {
    const singleSurah = await getSurah(params.uuid);

    return (
        <Container maxWidth="lg">
            <Row>
                <h1>Surah: {singleSurah.surah_name}</h1>
                <Spacer />
                <Link
                    href={`/panel/surah/edit/${singleSurah.surah_uuid}?continue=${encodeURIComponent(`/panel/surah/${singleSurah.surah_uuid}`)}`}
                >
                    <Button variant="filled">
                        Edit
                    </Button>
                </Link>

                <DeleteButton
                    pagePath={"/panel/surah/list"}
                    redirectTo={"/panel/surah/list?mushaf=" + singleSurah.mushaf_name}
                    controller="surah"
                    uuid={singleSurah.surah_uuid}
                    variant="tonal"
                />
            </Row>
            <Hr />
            <p>surah number : {singleSurah.surah_number}</p>
            <p>surah ayahs : {singleSurah.number_of_ayahs}</p>
            <p>surah uuid : {singleSurah.surah_uuid}</p>
            <p>mushaf name : {singleSurah.mushaf_name}</p>
            <p>mushaf uuid : {singleSurah.mushaf_uuid}</p>
            <p>bismillah status : {singleSurah.bismillah_status}</p>
            <p>
                bismillah as first ayah : {singleSurah.bismillah_as_first_ayah}
            </p>

            <Hr />
            <Row>
                <h2>List of Ayahs:</h2>
                <Spacer />
                <Button>Add Ayah</Button>
            </Row>
            <Table>
                <Thead style={{ textAlign: "justify" }}>
                    <Tr>
                        <Th>Number</Th>
                        <Th>Text</Th>
                        <Th>Sajdeh</Th>
                        <Th>More</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {singleSurah.ayahs.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.number}</Td>
                            <Td>{item.content.text}</Td>
                            <Td>{item.sajdeh}</Td>

                            <Td>
                                <Row>
                                    <Link href={"/panel/ayah/" + item.uuid}>
                                        <Button size="small" variant="link">
                                            View
                                        </Button>
                                    </Link>
                                    <Link
                                        href={`/panel/ayah/edit/${item.uuid}?continue=${encodeURIComponent("/panel/surah/" + singleSurah.surah_uuid)}`}
                                    >
                                        <Button size="small" variant="link">
                                            Edit
                                        </Button>
                                    </Link>

                                    <DeleteButton
                                        pagePath={`/panel/surah/${singleSurah.surah_uuid}`}
                                        controller="ayah"
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
