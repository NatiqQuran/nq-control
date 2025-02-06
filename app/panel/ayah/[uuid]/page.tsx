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
import DeleteButton from "../../../(components)/DeleteButton";
import Link from "next/link";
import { controllerAyah } from "../../../connnection";

export default async function Page({
    params,
    searchParams,
}: {
    params: { uuid: string };
    searchParams: { surah_uuid: string };
}) {
    const ayah = (await controllerAyah.view(params.uuid, {})).data;
    return (
        <Container size="xl">
            <Row>
                <h1>Ayah Number: {ayah.ayah_number}</h1>
                <Spacer />
                <Link
                    href={`/panel/ayah/edit/${
                        ayah.uuid
                    }?continue=${encodeURIComponent(
                        `/panel/ayah/${ayah.uuid}`
                    )}`}
                >
                    <Button variant="filled">Edit</Button>
                </Link>

                <DeleteButton
                    pagePath={`/panel/surah/${searchParams.surah_uuid}`}
                    redirectTo={`/panel/surah/${searchParams.surah_uuid}`}
                    controller="ayah"
                    uuid={ayah.uuid}
                    variant="tonal"
                />
            </Row>
            <Hr />

            <Row>
                <div>
                    <p>Number: {ayah.ayah_number}</p>
                    <p>UUID: {ayah.uuid}</p>
                    <p>sajdeh: {ayah.sajdah}</p>
                </div>
            </Row>
            <Hr />
            <Row>
                <h2>List of Words:</h2>
                <Spacer />

                <Link
                    href={`/panel/word/add?ayah_uuid=${
                        ayah.uuid
                    }&continue=${`/panel/ayah/${ayah.uuid}`}`}
                >
                    <Button variant="outlined">Add Word</Button>
                </Link>
            </Row>
            <Table>
                <Thead style={{ textAlign: "justify" }}>
                    <Tr>
                        <Th>UUID</Th>
                        <Th>Word</Th>
                        <Th>More</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {ayah.words.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.uuid}</Td>
                            <Td>{item.word}</Td>

                            <Td>
                                <Row>
                                    <Link href={"/panel/word/" + item.uuid}>
                                        <Button size="small" variant="link">
                                            View
                                        </Button>
                                    </Link>
                                    <Link
                                        href={`/panel/word/edit/${
                                            item.uuid
                                        }?continue=${encodeURIComponent(
                                            `/panel/ayah/${ayah.uuid}`
                                        )}`}
                                    >
                                        <Button size="small" variant="link">
                                            Edit
                                        </Button>
                                    </Link>

                                    <DeleteButton
                                        pagePath={`/panel/ayah/${ayah.uuid}`}
                                        controller="word"
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
