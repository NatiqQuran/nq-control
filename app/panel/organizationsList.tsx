import {
    Page,
    List,
    ListItem,
    Button,
    GridContainer,
    GridItem,
} from "@yakad/ui";
import Link from "next/link";
import Image from "next/image";

async function getOrgs(token: string) {
    const response = await fetch(`${process.env.API_URL}/organizations`, {
        headers: {
            Authorization: token,
        },
    });

    return response.json();
}

export default async function OrgsList({
    token,
}: {
    token: string;
}): Promise<JSX.Element> {
    const list: any[] = await getOrgs(token);

    return (
        <Page>
            <GridContainer
                style={{ padding: "2rem 0 0" }}
                rowGap={2}
                columnGap={2}
            >
                <GridItem xl={4} lg={6} md={12}>
                    <List direction="column">
                        {list.map(org => (
                            <ListItem
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    border: "1px solid rgb(125 125 125 / 13%)",
                                }}
                            >
                                {org.profile_image ? (
                                    <Image
                                        width={35}
                                        height={35}
                                        alt=""
                                        src={org.profile_image}
                                        style={{
                                            borderRadius: "15px",
                                            padding: "10px",
                                        }}
                                    />
                                ) : (
                                    "NP"
                                )}

                                <h1 style={{ marginRight: "auto" }}>
                                    {org.name}
                                </h1>
                                <Link
                                    href={`/panel/organization/edit/${org.account_id}`}
                                >
                                    <Button variant="link">Edit</Button>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </GridItem>
            </GridContainer>
        </Page>
    );
}
