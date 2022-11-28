import { Stack, Button } from "@yakad/ui";
import Login from "./login";
export default function Page() {
    return (
        <Stack style={{ alignItems: "center" }}>
            <div>
                <h3>Enter email to SignIn or Register account. </h3>
            </div>

            <Login />
            <Button>Cancel</Button>
        </Stack>
    );
}
