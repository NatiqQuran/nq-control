import { Container } from "@yakad/ui";
import { Permission } from "../list/page";
import { cookies } from "next/headers";

async function getPermission(uuid: string): Promise<Permission> {
    const response = await fetch(`${process.env.API_URL}/permission/${uuid}`, {
        headers: {
            Authorization: cookies().get("token")?.value || "none",
        },
    });

    if (response.status !== 200) {
        throw new Error(`Couldn't view permission!, ${await response.text()}`);
    }

    return response.json();
}

export default async function ViewPermission({
    params,
}: {
    params: { uuid: string };
}) {
    const permission = await getPermission(params.uuid);

    return (
        <Container maxWidth="xl">
            <h1>Permission uuid : {permission.uuid}</h1>
            <h1>Permission subject : {permission.subject}</h1>
            <h1>Permission object: {permission.object}</h1>
        </Container>
    );
}
