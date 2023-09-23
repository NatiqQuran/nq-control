import { Container } from "@yakad/ui";
import { Xtable } from "@yakad/x";

interface SimpleSurah {
    name: string;
    period: string | null;
    number: number;
    number_of_ayahs: number;
    uuid: string;
}

interface SurahTableHeader {
    name: string;
    number: string;
    number_of_ayahs: string;
    uuid: string;
}

async function getSurahsList(): Promise<SimpleSurah[]> {
    const response = await fetch(`${process.env.API_URL}/surah?mushaf=hafs`);

    return response.json();
}

export default async function Page() {
    const surahsList = await getSurahsList();
    const tableData: SurahTableHeader = {
        name: "Surah Name",
        number: "Surah Number",
        number_of_ayahs: "Number of Ayahs",
        uuid: "Surah uuid",
    };
    return (
        <Container>
            <h1>Surah List</h1>
            <Xtable head={tableData} data={surahsList} />
        </Container>
    );
}
