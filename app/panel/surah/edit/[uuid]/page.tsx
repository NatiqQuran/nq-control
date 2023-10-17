import { Surah } from "../../surah";
import EditSurahForm from "./form";

async function getSurah(uuid: string): Promise<Surah> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/surah/${uuid}`);

    return response.json();
}

export default async function Page({ params }: { params: { uuid: string } }) {
    const surah = await getSurah(params.uuid);

    return (
        <div>
            <EditSurahForm uuid={params.uuid} surah={surah} />
        </div>
    );
}
