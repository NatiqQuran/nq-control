import { Button } from "@yakad/ui";
import Symbol from "@yakad/symbols";
import Link from "next/link";

export default function ProfileButton() {
    return (
        <Link href="/panel/account">
            <Button icon="account_circle" />
        </Link>
    );
}
