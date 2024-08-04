export interface Translation {
    mushaf_uuid: string;
    translator_acccount_uuid: string;
    language: string;
    release_date?: string;
    source?: string;
    completed: boolean;
}

export async function getTranslation(uuid: string): Promise<Translation> {
    const response = await fetch(
        `${process.env.API_URL}/translation/${uuid}`
    );

    return response.json();
}
