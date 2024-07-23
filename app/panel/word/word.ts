export interface Word {
    uuid: string;
    word: string;
}

export async function getWord(uuid: string): Promise<Word> {
    const response = await fetch(
        `${process.env.API_URL}/word/${uuid}`
    );

    return response.json();
} 
