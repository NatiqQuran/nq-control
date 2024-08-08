import { redirect } from "next/navigation";
import { verify } from "./lib";
import { Button, CodeField, Hr, Stack } from "@yakad/ui";
import BackButton from "../../(components)/BackButton";

export default function Page({
    searchParams,
}: {
    searchParams: { email: string };
}) {
    return (
        <Stack align="center">
            <form
                style={{ width: "100%" }}
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
            <BackButton size="small" />
        </Stack>
    );
}
