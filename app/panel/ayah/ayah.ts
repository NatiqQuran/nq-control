interface Ayah {
    ayah_number: number;
    uuid: string;
    sajdeh: string;
}

export async function getAyah(uuid: string): Promise<Ayah> {
    const response = await fetch(
        `${process.env.API_URL}/ayah/${uuid}`
    );

    return response.json();
}


