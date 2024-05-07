import { redirect } from "next/navigation";
import { verify } from "./lib";
import { Button, CodeField, Hr, InputField, Row, Stack } from "@yakad/ui";
import { XbackButton } from "@yakad/x";

export default function Page({
    searchParams,
}: {
    searchParams: { email: string };
}) {
    return (
        <Stack style={{ alignItems: "center" }}>
            <form
                action={async (formData) => {
                    "use server";

                    await verify(searchParams.email, formData);

                    redirect("/panel");
                }}
            >
                <CodeField name="code" length={6} />
                <br />
                <Row style={{ justifyContent: "center" }}>
                    <Button variant="filled">Verify</Button>
                </Row>
            </form>
            <Hr />
            <XbackButton size="small" />
        </Stack>
    );
}
