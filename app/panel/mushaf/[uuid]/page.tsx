import { Button, Container, Hr, Row, Spacer } from "@yakad/ui";
import { ApiError } from "../../api";
import Link from "next/link";
import DeleteButton from "../../../(components)/DeleteButton";
import SurahList from "./surah_list";

interface SimpleMushaf {
    uuid: string;
    short_name: string;
    name: string;
    source: string;
    bissmillah_text: string;
}

async function getMushaf(uuid: string): Promise<SimpleMushaf> {
    const response = await fetch(`${process.env.API_URL}/mushaf/${uuid}`);

    if (response.status !== 200) {
        throw new Error(`You can't view this mushaf!, ${await response.text()}`);
    }

    return response.json();
}

export default async function ViewMushaf({
    params,
}: {
    params: { uuid: string };
}) {
    const mushaf = await getMushaf(params.uuid);

    return (
        <Container maxWidth="xl">
            <Row>
                <h1>Mushaf: {mushaf.name}</h1>
                <Spacer />
                <Link
                    href={`/panel/mushaf/edit/${mushaf.uuid}?continue=${encodeURIComponent(`/panel/mushaf/${mushaf.uuid}`)}`}
                >
                    <Button variant="filled">
                        Edit
                    </Button>
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
            <p>mushaf Bissmillah text: {mushaf.bissmillah_text}</p>

            <Hr />

            <SurahList mushaf={mushaf.name} />

        </Container>
    );
}
