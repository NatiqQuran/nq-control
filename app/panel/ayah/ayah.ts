import { Word } from "../word/word";

interface Ayah {
    ayah_number: number;
    uuid: string;
    sajdeh: string;
    text: string;
    words: Word[];
}

export async function getAyah(uuid: string): Promise<Ayah> {
    const response = await fetch(
        `${process.env.API_URL}/ayah/${uuid}`
    );

    return response.json();
}

