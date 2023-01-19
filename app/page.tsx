import Link from "next/link";
import { Main, Button, Page as Pg } from "@yakad/ui";

export default function Page() {
    return (
        <Pg style={{ position: "absolute", height: "100%" }}>
            <Main>
                <Link href="/account/login">
                    <Button variant="filled">Login</Button>
                </Link>

                <Link href="/panel">
                    <Button variant="filled">Open Panel</Button>
                </Link>
            </Main>
        </Pg>
    );
}
