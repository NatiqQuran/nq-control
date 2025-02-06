import {
    Button,
    Container,
    Hr,
    Row,
    Spacer,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@yakad/ui";
import Link from "next/link";
import DeleteButton from "../../../(components)/DeleteButton";
import { controllerSurah } from "../../../connnection";

export default async function ViewSurah({
    params,
}: {
    params: { uuid: string };
}) {
    const singleSurah = (await controllerSurah.view(params.uuid, {})).data;

    return (
        <Container size="xl">
            <Row>
                <h1>Surah: {singleSurah.names[0].arabic}</h1>
                <Spacer />
                <Link
                    href={`/panel/surah/edit/${
                        singleSurah.uuid
                    }?continue=${encodeURIComponent(
                        `/panel/surah/${singleSurah.uuid}`
                    )}`}
                >
                    <Button variant="filled">Edit</Button>
                </Link>

                <DeleteButton
                    pagePath={"/panel/surah/list"}
                    redirectTo={
                        "/panel/surah/list?mushaf=" +
                        singleSurah.mushaf.short_name
                    }
                    controller="surah"
                    uuid={singleSurah.uuid}
                    variant="tonal"
                />
            </Row>
            <Hr />
            <p>surah number : {singleSurah.number}</p>
            <p>surah ayahs : {singleSurah.number_of_ayahs}</p>
            <p>surah uuid : {singleSurah.uuid}</p>
            <p>mushaf name : {singleSurah.mushaf.short_name}</p>
            <p>mushaf uuid : {singleSurah.mushaf.uuid}</p>
            <p>bismillah status : {singleSurah.bismillah_status}</p>
            <p>
                bismillah as first ayah : {singleSurah.bismillah_as_first_ayah}
            </p>

            <Hr />
            <Row>
                <h2>List of Ayahs:</h2>
                <Spacer />
                <Link
                    href={`/panel/ayah/add?surah_uuid=${
                        params.uuid
                    }&continue=${encodeURIComponent(
                        `/panel/surah/${params.uuid}`
                    )}`}
                >
                    <Button variant="outlined">Add Ayah</Button>
                </Link>
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
                            <Td>{item.text}</Td>
                            <Td>{item.sajdah}</Td>

                            <Td>
                                <Row>
                                    <Link
                                        href={`/panel/ayah/${item.uuid}?surah_uuid=${singleSurah.uuid}`}
                                    >
                                        <Button size="small" variant="link">
                                            View
                                        </Button>
                                    </Link>
                                    <Link
                                        href={`/panel/ayah/edit/${
                                            item.uuid
                                        }?continue=${encodeURIComponent(
                                            "/panel/surah/" + singleSurah.uuid
                                        )}`}
                                    >
                                        <Button size="small" variant="link">
                                            Edit
                                        </Button>
                                    </Link>

                                    <DeleteButton
                                        pagePath={`/panel/surah/${singleSurah.uuid}`}
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
