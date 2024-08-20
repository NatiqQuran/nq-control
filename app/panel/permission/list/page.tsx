import {
    Container,
    Button,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Row,
    Spacer,
} from "@yakad/ui";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DeleteButton from "../../../(components)/DeleteButton";
import Link from "next/link";

export interface Permission {
    uuid?: string;
    account: {
        uuid: string | null;
        username: string | null;
        first_name: string | null;
        last_name: string | null;
    };
    object: string;
    action: "create" | "delete" | "edit" | "view";
    conditions: PermissionCondition[];
}

interface PermissionCondition {
    name: string;
    value: string;
}

async function getPermissionsList(token: string): Promise<Permission[]> {
    const response = await fetch(`${process.env.API_URL}/permission`, {
        headers: {
            Authorization: token,
        },
    });

    if (response.status !== 200) {
        throw new Error(`Could't view permissions, ${await response.text()}`);
    }

    return response.json();
}

export default async function Page() {
    const token = cookies().get("token")?.value || redirect("/account/login");
    const permissions = await getPermissionsList(token);

    return (
        <Container maxWidth="xl">
            <Row>
                <h1>Permissions List</h1>
                <Spacer />
                <Link href={"/panel/permission/add"}>
                    <Button variant="outlined">Add Permission</Button>
                </Link>
            </Row>
            <Table>
                <Thead style={{ textAlign: "justify" }}>
                    <Tr>
                        <Th>UUID</Th>
                        <Th>Account</Th>
                        <Th>Object</Th>
                        <Th>Action</Th>
                        <Th>Conditions</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {permissions.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.uuid}</Td>
                            <Td>{item.account.username}</Td>
                            <Td>{item.object}</Td>
                            <Td>{item.action}</Td>
                            <Td>{item.conditions.length} item</Td>
                            <Td>
                                <Row>
                                    <Link
                                        href={"/panel/permission/" + item.uuid}
                                    >
                                        <Button size="small" variant="link">
                                            View
                                        </Button>
                                    </Link>
                                    <Link
                                        href={
                                            "/panel/permission/edit/" +
                                            item.uuid
                                        }
                                    >
                                        <Button size="small" variant="link">
                                            Edit
                                        </Button>
                                    </Link>

                                    <DeleteButton
                                        pagePath="/panel/permission/list"
                                        controller="permission"
                                        uuid={item.uuid!}
                                        variant="link"
                                        size="small"
                                    />
                                </Row>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Container>
    );
}
