export interface TranslationText {
    uuid: string;
    text: string;
}

export async function getTranslationText(translation_uuid: string, ayah_uuid: string): Promise<TranslationText> {
    const response = await fetch(
        `${process.env.API_URL}/translation/text/${translation_uuid}?ayah_uuid=${ayah_uuid}`
    );

    if (response.status !== 200) {
        throw new Error(`You can't view this translation text!, ${await response.text()}`);
    }

    return response.json();
}
