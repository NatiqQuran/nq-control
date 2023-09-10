import { Container } from "@yakad/ui";
import { Xtable } from "@yakad/x";

interface SimpleSurah {
    name: string,
    period: string | null,
    number: number;
    number_of_ayahs: number;
    uuid: string;
}

interface SurahTableHeader {
    name: string,
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
        name: "name2",
        number: "number2",
        number_of_ayahs: "noa2",
        uuid: "221213131313"
    };
    return (
        <Container>
            <h1>JAFAR</h1>
            <Xtable head={tableData} data={surahsList} />
        </Container>
    )
}
