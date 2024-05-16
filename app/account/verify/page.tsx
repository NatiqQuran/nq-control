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
        <Stack align="center">
            <form
                action={async (formData) => {
                    "use server";

                    await verify(searchParams.email, formData);

                    redirect("/panel");
                }}
            >
                <Stack align="center">
                    <CodeField name="code" length={6} />
                    <Button variant="filled">Verify</Button>
                </Stack>
            </form>
            <Hr />
            <XbackButton size="small" />
        </Stack>
    );
}
