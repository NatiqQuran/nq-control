import { Container } from "@yakad/ui";
import { getWord } from "../word";

export default async function Page({ params }: { params: { uuid: string } }) {
    const word = await getWord(params.uuid);

    return (
        <Container size="lg">
            <p>UUID: {word.uuid}</p>
            <p>Word: {word.word}</p>
        </Container>
    );
}
