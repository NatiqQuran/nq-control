import { Button, Container, Hr, Row, Spacer } from "@yakad/ui"
import Link from "next/link"
import DeleteButton from "../../../(components)/DeleteButton"
import { Translation, getTranslation } from "../translation"

export default async function Page({ params }: {
    params: {
        uuid: string
    }
}) {
    const translation: Translation = await getTranslation(params.uuid);

    return (
        <Container maxWidth="lg">
            <Row>
                <h1>Translation for mushaf: {translation.mushaf_uuid}</h1>
                <Spacer />
                <Link
                    href={`/panel/translation/edit/${params.uuid}?continue=${encodeURIComponent(`/panel/translation/${params.uuid}`)}`}
                >
                    <Button variant="filled">
                        Edit
                    </Button>
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
                    <p>Completed: {translation.completed ? "Yes" : "No"}</p>
                    <p>Release date: {translation.release_date}</p>
                </div>

            </Row>
            <Hr />

        </ Container>

    );
}
