import { Container } from "@yakad/ui";
import { ApiError } from "../../api";

interface SimpleMushaf {
    uuid: string;
    name: string;
    source: string;
}

async function getMushaf(uuid: string): Promise<Response> {
    const response = await fetch(`${process.env.API_URL}/mushaf/${uuid}`);

    return response;
}

export default async function ViewMushaf({
    params,
}: {
    params: { uuid: string };
}) {
    const response = await getMushaf(params.uuid);

    if (response.status >= 400) {
        throw new ApiError(response.status);
    }

    const singleMushaf: SimpleMushaf = await response.json();

    return (
        <Container maxWidth="xl">
            <h1>mushaf uuid : {singleMushaf.uuid}</h1>
            <h1>mushaf name : {singleMushaf.name}</h1>
            <h1>mushaf source: {singleMushaf.source}</h1>
        </Container>
    );
}
