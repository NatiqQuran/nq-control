import { Button, Container, Hr, Row, Spacer } from "@yakad/ui";
import Link from "next/link";
import { TranslationText, getTranslationText } from "../translation_text";

export default async function Page(
    { params, searchParams }: { params: { uuid: string }, searchParams: { ayah_uuid: string } }
) {
    const translation_text: TranslationText = await getTranslationText(params.uuid, searchParams.ayah_uuid);

    return (
        <Container maxWidth="lg">
            <Row>
                <h1>Text: {translation_text.uuid}</h1>
                <Spacer />
                <Link
                    href={`/panel/translation/text/edit/${params.uuid}?ayah_uuid=${searchParams.ayah_uuid}&continue=${encodeURIComponent(`/panel/translation/text/${params.uuid}?ayah_uuid=${searchParams.ayah_uuid}`)}`}
                >
                    <Button variant="filled">
                        Edit
                    </Button>
                </Link>
            </Row >
            <Hr />
            <p>Text : {translation_text.text}</p>
            <Hr />

        </Container>

    );
}
