import { PermissionViewResponseData } from "@ntq/sdk";
import { Container } from "@yakad/ui";
import { cookies } from "next/headers";

async function getPermission(
    uuid: string
): Promise<PermissionViewResponseData> {
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
        <Container size="xl">
            <h1>Permission uuid : {permission.uuid}</h1>
            <h1>Account username : {permission.account.username}</h1>
            <h1>Account First name : {permission.account.first_name}</h1>
            <h1>Account Last name : {permission.account.last_name}</h1>
            <h1>Permission object: {permission.object}</h1>
        </Container>
    );
}
