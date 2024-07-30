import { Button, Container, Hr, Row, Spacer, } from "@yakad/ui";
import DeleteButton from "../../../(components)/DeleteButton";
import Link from "next/link";
import { getUser } from "../user";
import { cookies } from "next/headers";

export default async function Page({ params }: { params: { uuid: string } }) {
    const user = await getUser(cookies().get("token")?.value || "none", params.uuid);

    return (

        <Container maxWidth="lg">
            <Row>
                <h1>User: {user.username}</h1>
                <Spacer />
                <Link
                    href={`/panel/user/edit/${user.uuid}?continue=${encodeURIComponent(`/panel/user/${user.uuid}`)}`}
                >
                    <Button variant="filled">
                        Edit
                    </Button>
                </Link>

                <DeleteButton
                    pagePath={`/panel/user/${user.uuid}`}
                    redirectTo={`/panel/user/${user.uuid}`}
                    controller="user"
                    uuid={user.uuid}
                    variant="tonal"
                />
            </Row>
            <Hr />

            <Row>
                <div>
                    <p>UUID: {user.uuid}</p>
                    <p>Email: {user.email}</p>
                    <p>Username: {user.username}</p>
                    <p>First name: {user.first_name}</p>
                    <p>Last name: {user.last_name}</p>
                    <p>Birthday: {user.birthday}</p>
                    <p>Profile Image URL: {user.profile_image}</p>
                    <p>Language: {user.language}</p>
                </div>

            </Row>
            <Hr />
        </Container>
    );
}

