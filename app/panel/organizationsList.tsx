import { Page, List, ListItem, Button } from "@yakad/ui";
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
}: { token: string }): Promise<JSX.Element> {
    const list: any[] = await getOrgs(token);

    return (
        <Page>
            <List direction="column">
                {list.map((org) => (
                    <ListItem
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            border: "1px solid rgb(125 125 125 / 13%)",
                        }}
                    >
                        <Image
                            width={35}
                            height={35}
                            alt=""
                            src={org.profile_image}
                            style={{ borderRadius: "15px", padding: "10px" }}
                        />
                        <h1 style={{ marginRight: "auto" }}>{org.name}</h1>

                        <Link href={`/panel/organization/edit/${org.id}`}>
                            <Button variant="link">Edit</Button>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Page>
    );
}
