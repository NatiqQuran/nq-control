import { redirect } from "next/navigation";
import { verify } from "./lib";
import { Button, InputField, Row } from "@yakad/ui";

export default function Page({ searchParams }: { searchParams: { email: string } }) {
    return (
        <>
            <form
                action={async (formData) => {
                    "use server";

                    await verify(searchParams.email, formData);

                    redirect("/panel");
                }}
            >
                <InputField name="code" type="number" placeholder="Code" />
                <Row style={{ justifyContent: "center" }}>
                    <Button>Verify</Button>
                </Row>
            </form>
        </>
    );
}
