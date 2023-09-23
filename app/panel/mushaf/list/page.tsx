import { Button, Container, Row, Spacer } from "@yakad/ui";
import { Xtable } from "@yakad/x";
import AddButton from "./addButton";
import SurahOpt from "./surahOpt";

interface SimpleMushaf {
    name: string;
    source: string;
    uuid: string;
}
interface MushafTableHeader {
    name: string;
    source: string;
    uuid: string;
}
async function getMushafsList(): Promise<SimpleMushaf[]> {
    const response = await fetch(`${process.env.API_URL}/mushaf`);

    return response.json();
}

export default async function Page() {
    const mushafList = await getMushafsList();
    const tableData: MushafTableHeader = {
        name: "Mushaf Name",
        source: "Mushaf Source",
        uuid: "Mushaf uuid",
    };
    return (
        <Container>
            <Row>
                <h1>Mushaf List</h1>
                <Spacer />
                <AddButton />
                <SurahOpt />
            </Row>
            <Xtable head={tableData} data={mushafList} />
        </Container>
    );
}
