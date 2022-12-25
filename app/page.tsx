import Link from "next/link";
import { Main, Button } from "@yakad/ui";

export default function Page() {
    return (
        <Main>
            <Link href="/account/login">
                <Button variant="filled">Login</Button>
            </Link>
        </Main>
    );
}
