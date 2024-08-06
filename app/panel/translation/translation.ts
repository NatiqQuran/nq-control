interface TranslationAyah {
    uuid: string;
    text_uuid?: string;
    number: number;
    surah_number: number;
    text?: string;
}

export interface Translation {
    mushaf_uuid: string;
    translator_acccount_uuid: string;
    language: string;
    release_date?: string;
    source?: string;
    approved: boolean;
    ayahs: TranslationAyah[];
}

export async function getTranslation(uuid: string): Promise<Translation> {
    const response = await fetch(
        `${process.env.API_URL}/translation/${uuid}`
    );

    return response.json();
}
