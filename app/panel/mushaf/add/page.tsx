import { Button, Container, InputField, Row, Stack } from "@yakad/ui";
import BackButton from "../../../(components)/BackButton";
import { controllerMushaf } from "../../../connnection";

export default function Page() {
    return (
        <Container size="sm">
            <h1>Add new Mushaf</h1>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";

                    const requestBody = {
                        name: formData.get("name")?.toString()!,
                        short_name: formData.get("short_name")?.toString()!,
                        source: formData.get("source")?.toString()!,
                        bismillah_text: formData
                            .get("bismillah_text")
                            ?.toString()!,
                    };

                    await controllerMushaf.add(requestBody, {});
                }}
            >
                <Stack>
                    <InputField
                        variant="outlined"
                        placeholder="Mushaf Name"
                        type="string"
                        name="name"
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Mushaf short name"
                        type="string"
                        name="short_name"
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Mushaf Source"
                        type="string"
                        name="source"
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Bismillah text in Mushaf"
                        type="string"
                        name="bismillah_text"
                    />

                    <Row align="end">
                        <BackButton>Cancel</BackButton>
                        <Button loadingvariant="spinner" variant="filled">
                            Add
                        </Button>
                    </Row>
                </Stack>
            </form>
        </Container>
    );
}
