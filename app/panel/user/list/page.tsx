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
import Link from "next/link";
import DeleteButton from "../../../(components)/DeleteButton";
import { cookies } from "next/headers";
import { User } from "../user";

async function getUserList(): Promise<User[]> {
    const response = await fetch(
        `${process.env.API_URL}/user`,
        {
            headers: {
                Authorization: cookies().get("token")?.value || "none",
            }
        }
    );

    if (response.status !== 200) {
        throw new Error(`Could't get users list, ${await response.text()}`);
    }

    return response.json();
}

export default async function Page() {
    const usersList = await getUserList();

    return (
        <Container maxWidth="xl">
            <Row >
                <h1>Users List</h1>
                <Spacer />

                <Link href={"/panel/user/add"}>
                    <Button variant="outlined">Add User</Button>
                </Link>
            </Row>
            <Table>
                <Thead style={{ textAlign: "justify" }}>
                    <Tr>
                        <Th>UUID</Th>
                        <Th>Email</Th>
                        <Th>Username</Th>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th>Birthday</Th>
                        <Th>Profile Image URL</Th>
                        <Th>Language</Th>
                        <Th>More</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {usersList.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.uuid}</Td>
                            <Td>{item.email}</Td>
                            <Td>{item.username}</Td>
                            <Td>{item.first_name}</Td>
                            <Td>{item.last_name}</Td>
                            <Td>{item.birthday}</Td>
                            <Td>{item.profile_image}</Td>
                            <Td>{item.language}</Td>

                            <Td>
                                <Row>
                                    <Link href={"/panel/user/" + item.uuid}>
                                        <Button size="small" variant="link">
                                            View
                                        </Button>
                                    </Link>
                                    <Link
                                        href={`/panel/user/edit/${item.uuid}?continue=${encodeURIComponent("/panel/user/list")}`}
                                    >
                                        <Button size="small" variant="link">
                                            Edit
                                        </Button>
                                    </Link>

                                    <DeleteButton
                                        pagePath="/panel/user/list"
                                        controller="user"
                                        uuid={item.uuid}
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
