import { Stack, Button, InputField, Row, Spacer, Hr } from "@yakad/ui";
import { sendCode } from "./lib";
import { redirect } from "next/navigation";

export default function Page() {
    return (
        <Stack style={{ alignItems: "center" }}>
            <span>
                <h3>Enter email to SignIn or Register account. </h3>
            </span>

            <form action={async (formData) => {
                "use server";

                await sendCode(formData);

                redirect(`/account/verify?email=${formData.get("email")}`)
            }}>
                <InputField
                    placeholder="Email"
                    type="email"
                    name="email"
                />

                <Row style={{ justifyContent: "center" }}>
                    <Button variant="filled">Send</Button>
                </Row>
            </form>
            <Hr />
            <Button size="small" variant="text">
                Cancel
            </Button>
        </Stack>
    );
}
