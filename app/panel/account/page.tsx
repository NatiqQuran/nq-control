import { Container, Button, Loading, Row, Stack, Hr, SvgIcon } from "@yakad/ui";
import { cookies } from "next/headers";
import Image from "next/image";
import AccountIcon from "../account";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { getUserProfile, UserProfile } from "../profile/profile";
import OrgsList from "../organizationsList";
import Logout from "../../(components)/Logout";

export default async function Page() {
    const cookie = cookies();
    const token = cookie.get("token") || redirect("/account/login");

    const profile: UserProfile = await getUserProfile(token.value);

    return (
        <Container maxWidth="sm">
            <Row>
                <div
                    style={{
                        display: "flex",
                    }}
                >
                    {profile.profile_image ? (
                        <Image
                            src={profile.profile_image || ""}
                            alt="Profile Image"
                            width={50}
                            height={50}
                        />
                    ) : (
                        <SvgIcon size={10}>
                            <AccountIcon />
                        </SvgIcon>
                    )}
                </div>
                <Stack style={{ gap: "0" }}>
                    <h1> {profile.first_name}</h1>
                    <h2> {profile.username}</h2>
                    <Row>
                        <Link
                            href={`/panel/profile/edit`}
                            style={{ padding: "10px" }}
                        >
                            <Button size="small" variant="filled">
                                EDIT
                            </Button>
                        </Link>
                        <Logout />
                    </Row>
                </Stack>
            </Row>

            <Hr />
            <Suspense fallback={<Loading variant="spinner" />}>
                <OrgsList token={token.value} />
            </Suspense>

            <Link href={"/panel/organization/add"} style={{ padding: "10px" }}>
                <Button variant="filled">Add org</Button>
            </Link>
        </Container>
    );
}
