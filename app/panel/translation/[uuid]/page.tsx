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
import { controllerTranslation } from "../../../connnection";

export default async function Page({
    params,
}: {
    params: {
        uuid: string;
    };
}) {
    const translation = (await controllerTranslation.view(params.uuid, {}))
        .data;

    return (
        <Container size="lg">
            <Row>
                <h1>Translation for mushaf: {translation.mushaf_uuid}</h1>
                <Spacer />

                <Link
                    href={`/panel/translation/edit/${
                        params.uuid
                    }?continue=${encodeURIComponent(
                        `/panel/translation/${params.uuid}`
                    )}`}
                >
                    <Button variant="filled">Edit</Button>
                </Link>

                <DeleteButton
                    pagePath={`/panel/translation/list`}
                    redirectTo={`/panel/translation/list`}
                    controller="translation"
                    uuid={params.uuid}
                    variant="tonal"
                />
            </Row>
            <Hr />

            <Row>
                <div>
                    <p>UUID: {params.uuid}</p>
                    <p>Mushaf UUID: {translation.mushaf_uuid}</p>
                    <p>source: {translation.source}</p>
                    <p>language: {translation.language}</p>
                    <p>Status: {translation.status}</p>
                    <p>Release date: {translation.release_date}</p>
                </div>
            </Row>
            <Hr />

            <Row>
                <h2>List of Ayahs:</h2>
            </Row>
            <Table>
                <Thead style={{ textAlign: "justify" }}>
                    <Tr>
                        <Th>Number</Th>
                        <Th>Surah Number</Th>
                        <Th>Text</Th>
                        <Th>More</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {translation.ayahs.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.number}</Td>
                            <Td>{item.surah_number}</Td>
                            <Td>{item.text}</Td>

                            <Td>
                                <Row>
                                    <Link
                                        href={`/panel/translation/text/${params.uuid}?ayah_uuid=${item.uuid}`}
                                    >
                                        <Button size="small" variant="link">
                                            View
                                        </Button>
                                    </Link>

                                    <Link
                                        href={`/panel/translation/text/edit/${
                                            params.uuid
                                        }?ayah_uuid=${
                                            item.uuid
                                        }&continue=${encodeURIComponent(
                                            `/panel/translation/${params.uuid}`
                                        )}`}
                                    >
                                        <Button size="small" variant="link">
                                            Edit
                                        </Button>
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
