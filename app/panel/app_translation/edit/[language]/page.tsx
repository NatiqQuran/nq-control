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
    InputField,
    Hr,
} from "@yakad/ui";
import Link from "next/link";
import { cookies } from "next/headers";
import { get_phrase } from "../../phrase/phrase";
import { revalidatePath } from "next/cache";
import SaveBtn from "./saveBtn";
import BackButton from "../../../../(components)/BackButton";

type Phrases = { phrase: string; translation: string }[];

async function updateTranslations(
    formData: FormData,
    phrases: Phrases,
    lang: string
) {
    let result = {};

    for (const item of phrases) {
        Object.defineProperty(result, item.phrase, {
            value: formData.get(item.phrase)?.toString() || null,
            writable: true,
            enumerable: true,
            configurable: true,
        });
    }

    const response = await fetch(`${process.env.API_URL}/phrase/${lang}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: cookies().get("token")?.value || "none",
        },
        body: JSON.stringify(result),
    });

    if (response.status !== 200) {
        throw new Error(
            `You can't edit this phrase translation!, ${await response.text()}`
        );
    }
}

export default async function Page({
    params,
}: {
    params: { language: string };
}) {
    const phraseView = await get_phrase(
        cookies().get("token")?.value || "none",
        params.language
    );

    const phrases: Phrases = [];

    for (const property in phraseView) {
        phrases.push({ phrase: property, translation: phraseView[property] });
    }

    return (
        <Container size="md">
            <Row>
                <h1>Phrases</h1>
                <Spacer />

                <Link href={"/panel/app_translation/phrase/add"}>
                    <Button variant="outlined">Add Phrase</Button>
                </Link>
            </Row>

            <form
                action={async (formData) => {
                    "use server";

                    await updateTranslations(
                        formData,
                        phrases,
                        params.language
                    );
                    revalidatePath(
                        `/panel/app_translation/edit/${params.language}`
                    );
                }}
            >
                <Table>
                    <Thead style={{ textAlign: "justify" }}>
                        <Tr>
                            <Th>Phrase</Th>
                            <Th>Translation</Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {phrases.map((phrase, key) => (
                            <Tr key={key}>
                                <Td>
                                    <h3>{phrase.phrase}</h3>
                                </Td>

                                <Td>
                                    <InputField
                                        name={phrase.phrase}
                                        defaultValue={phrase.translation}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Hr marginx={3} />
                <Row>
                    <BackButton variant="outlined" />
                    <SaveBtn />
                </Row>
            </form>
        </Container>
    );
}
