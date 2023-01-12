import { Page, List, ListItem } from "@yakad/ui";
import Image from "next/image";

async function getOrgs(token: string) {
    const response = await fetch(`${process.env.API_URL}/organizations`, {
        headers: {
            Authorization: token,
        },
    });

    return response.json();
}

export default async function OrgsList({ token }: { token: string }) {
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
                        <h1>{org.name}</h1>
                    </ListItem>
                ))}
            </List>
        </Page>
    );
}
