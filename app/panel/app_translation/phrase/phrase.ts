export async function get_phrase(cookie: string, language: string) {
    const response = await fetch(
        `${process.env.API_URL}/phrase/${language}`,
        {
            headers: {
                Authorization: cookie
            }
        }
    );

    if (response.status !== 200) {
        throw new Error(`Could't get phrase translations!, ${await response.text()}`);
    }

    return response.json();
}
