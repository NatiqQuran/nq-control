import { Container, Button, Row } from "@yakad/ui";
import { redirect } from "next/navigation";

export default async function Page() {
    return redirect("/panel/overview");
}
