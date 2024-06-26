import { Container } from "@yakad/ui";
import { XdataMap, Xtable } from "@yakad/x";

interface SimpleSurah {
    mushaf_uuid: string;
    mushaf_name: string;
    surah_uuid: string;
    surah_name: string;
    surah_period: string;
    surah_number: number;
    bismillah_status: boolean;
    bismillah_as_first_ayah: boolean;
    number_of_ayahs: string;

    ayahs: {
        number: number;
        uuid: string;
        sajdeh: string;
        content: { text: string };
    }[];
}

async function getSurah(uuid: string): Promise<SimpleSurah> {
    const response = await fetch(
        `${process.env.API_URL}/surah/${uuid}?mushaf=hafs`
    );

    return response.json();
}

export default async function ViewSurah({
    params,
}: {
    params: { uuid: string };
}) {
    const singleSurah = await getSurah(params.uuid);

    return (
        <Container maxWidth="xl">
            <h1>surah number : {singleSurah.surah_number}</h1>
            <h1>surah name : {singleSurah.surah_name}</h1>
            <h1>surah ayahs : {singleSurah.number_of_ayahs}</h1>
            <h1>surah uuid : {singleSurah.surah_uuid}</h1>
            <h1>mushaf name : {singleSurah.mushaf_name}</h1>
            <h1>mushaf uuid : {singleSurah.mushaf_uuid}</h1>
            <h1>bismillah status : {singleSurah.bismillah_status}</h1>
            <h1>
                bismillah as first ayah : {singleSurah.bismillah_as_first_ayah}
            </h1>

            <XdataMap
                data={singleSurah.ayahs.map((ayah) => ({
                    number: ayah.number,
                    text: ayah.content.text,
                    sajdeh: ayah.sajdeh,
                    uuid: ayah.uuid,
                }))}
            />
        </Container>
    );
}
