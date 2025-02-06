import { Button, Card, Row, Stack, Spacer, Container } from "@yakad/ui";
import Link from "next/link";
import Image from "next/image";
import Organizationicon from "./account/organizationicon";
import { Organization } from "./organization";

async function getOrgs(token: string) {
    const response = await fetch(`${process.env.API_URL}/organization`, {
        headers: {
            Authorization: token,
        },
    });

    if (response.status !== 200) {
        throw new Error(
            `Could't get list of organizations!, ${await response.text()}`
        );
    }

    return response.json();
}

export default async function OrgsList({
    token,
}: {
    token: string;
}): Promise<JSX.Element> {
    const list: Organization[] = await getOrgs(token);

    return (
        <Container size="xs">
            {list.map((org, index) => (
                <Card
                    key={index}
                    style={{
                        alignItems: "center",
                        marginBottom: "1.5rem",
                    }}
                >
                    <Row>
                        {org.profile_image ? (
                            <Image
                                width={50}
                                height={50}
                                alt=""
                                src={org.profile_image}
                                style={{
                                    borderRadius: "4rem",
                                }}
                            />
                        ) : (
                            <Organizationicon />
                        )}
                        <Stack>
                            <h1 style={{ marginRight: "auto" }}>
                                {org.primary_name}
                            </h1>
                            <h2>{org.username}</h2>
                        </Stack>
                        <Spacer />
                        <Link href={`/panel/organization/edit/${org.uuid}`}>
                            <Button variant="link">Edit</Button>
                        </Link>
                    </Row>
                </Card>
            ))}
        </Container>
    );
}
