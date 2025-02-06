import { Button, Container, Hr, Row, Spacer } from "@yakad/ui";
import Link from "next/link";
import DeleteButton from "../../../(components)/DeleteButton";
import SurahList from "./surah_list";
import { controllerMushaf } from "../../../connnection";

export default async function ViewMushaf({
    params,
}: {
    params: { uuid: string };
}) {
    const mushaf = (await controllerMushaf.view(params.uuid, {})).data;

    return (
        <>
            <Container size="xl">
                <Row>
                    <h1>Mushaf: {mushaf.name}</h1>
                    <Spacer />
                    <Link
                        href={`/panel/mushaf/edit/${
                            mushaf.uuid
                        }?continue=${encodeURIComponent(
                            `/panel/mushaf/${mushaf.uuid}`
                        )}`}
                    >
                        <Button variant="filled">Edit</Button>
                    </Link>

                    <DeleteButton
                        pagePath={`/panel/mushaf/${mushaf.uuid}`}
                        controller="mushaf"
                        uuid={mushaf.uuid}
                        variant="tonal"
                    />
                </Row>
                <Hr />
                <p>mushaf uuid: {mushaf.uuid}</p>
                <p>mushaf short name: {mushaf.short_name}</p>
                <p>mushaf full name: {mushaf.name}</p>
                <p>mushaf source: {mushaf.source}</p>
                <p>mushaf Bissmillah text: {mushaf.bismillah_text}</p>

                <Hr />
            </Container>
            <SurahList mushaf={mushaf.short_name} mushaf_uuid={mushaf.uuid} />
        </>
    );
}
