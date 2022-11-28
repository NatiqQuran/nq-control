import { Stack, Form, Button, Row, Spacer } from "@yakad/ui";
import Verify from "./verify";

export default function Page() {
    return (
        <Stack style={{ alignItems: "center" }}>
            <div style={{ width: "100%" }}>
                <h1>Enter your code</h1>
                <h3 style={{ color: "#7d7d7d" }}>
                    We sended a code to your email .
                </h3>
            </div>

            <Verify />
        </Stack>
    );
}
