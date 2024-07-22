import { Container, Row } from "@yakad/ui";
import { getAyah } from "../ayah";

export default async function Page({ params }: { params: { uuid: string } }) {
    const ayah = await getAyah(params.uuid);
    return (

        <Container maxWidth="lg">
            <Row>
                <div>
                    <p>Number: {ayah.ayah_number}</p>
                    <p>UUID: {ayah.uuid}</p>
                    <p>sajdeh: {ayah.sajdeh}</p>
                </div>

            </Row>
        </Container>
    );
}
