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
import DeleteButton from "../../../../(components)/DeleteButton";
import { cookies } from "next/headers";
import { get_phrase } from "../phrase";

export default async function Page() {
    const phraseView = await get_phrase(
        cookies().get("token")?.value || "none",
        "en"
    );

    const phrases = [];

    for (const property in phraseView) {
        phrases.push(property);
    }

    return (
        <Container size="xl">
            <Row>
                <h1>Phrases</h1>
                <Spacer />

                <Link href={"/panel/app_translation/phrase/add"}>
                    <Button variant="outlined">Add Phrase</Button>
                </Link>
            </Row>

            <Table>
                <Thead style={{ textAlign: "justify" }}>
                    <Tr>
                        <Th>Phrase</Th>
                        <Th>More</Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {phrases.map((phrase, key) => (
                        <Tr key={key}>
                            <Td>{phrase}</Td>

                            <Td>
                                <DeleteButton
                                    pagePath="/panel/app_translation/phrase/list"
                                    controller="phrase"
                                    uuid={phrase}
                                    variant="link"
                                    size="small"
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Container>
    );
}
