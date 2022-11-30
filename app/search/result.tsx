import { use } from "react";

interface Surah {
    id: number;
    text: string;
}

async function fetchSurah(id: number) {
    const response = await fetch(
        `https://api.natiq.net/quran?from=${id}&to=${id}`
    );

    return response.json();
}

const fetchMap: Map<string, Promise<any>> = new Map();

function queryClient<T>(name: string, query: () => Promise<T>) {
    if (fetchMap.has(name) === false) {
        fetchMap.set(name, query());
    }

    return fetchMap.get(name)!;
}

export default function Result({ surahId }: any) {
    const surah = use(queryClient(surahId, () => fetchSurah(surahId)));

    return (
        <>
            {surah.map((surah: any) => (
                <p key={surah.id}>{surah.text}</p>
            ))}
        </>
    );
}
