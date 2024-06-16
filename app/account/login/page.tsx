import { Stack, Button, InputField, Hr } from "@yakad/ui";
import { sendCode } from "./lib";
import { redirect } from "next/navigation";
import BackButton from "../../(components)/BackButton";

export default function Page() {
    return (
        <Stack align="center">
            <span>
                <h3>Enter email to SignIn or Register account. </h3>
            </span>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";

                    await sendCode(formData);

                    redirect(`/account/verify?email=${formData.get("email")}`);
                }}
            >
                <Stack align="center">
                    <InputField placeholder="Email" type="email" name="email" />
                    <Button variant="filled">Send</Button>
                </Stack>
            </form>
            <Hr />
            <BackButton size="small">Cancel</BackButton>
        </Stack>
    );
}
