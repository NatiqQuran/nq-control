import { Container, Button, Row } from "@yakad/ui";
import Link from "next/link";

export default async function Page() {
    return (
        <Container>
            <Row>
                <Link href="./panel/account">
                    <Button variant="filledtonal">Accounts</Button>
                </Link>
            </Row>
        </Container>
    );
}
