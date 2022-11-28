import Link from "next/link";
import { Button } from "@yakad/ui";

export default function Page() {
  return (
    <>
      <Link href="/account/login">
        <Button variant="filled">Login</Button>
      </Link>
    </>
  );
}
