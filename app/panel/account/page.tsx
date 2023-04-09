import {
    Main,
    Container,
    AppBar,
    Spacer,
    Button,
    Page as Pg,
    Loading,
    Row,
    Stack,
    Hr,
    SvgIcon,
} from "@yakad/ui";
import { cookies } from "next/headers";
import Image from "next/image";
import AccountIcon from "../account";
import Menu from "../menu";
import Logout from "../logout";
import { redirect } from "next/navigation";
import Link from "next/link";
import OrgsList from "../organizationsList";
import { Suspense } from "react";
import { getUserProfile, UserProfile } from "../profile/profile";

export default async function Page() {
    const cookie = cookies();
    const token = cookie.get("token") || redirect("/account/login");

    const profile: UserProfile = await (async () => {
        const profileFromApi = await getUserProfile(token.value);

        return profileFromApi.status === 401
            ? redirect("/account/login")
            : profileFromApi.json();
    })();

    return (
        <Pg style={{ position: "absolute", height: "100%" }}>
            <Main
                style={{
                    position: "fixed",
                    top: "1rem",
                    height: "calc(100% - 1rem)",
                }}
            >
                <Container
                    // maxWidth="sm"
                    maxWidth="sm"
                    style={{
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "0 2rem 4rem",
                    }}
                >
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
                                    href={"/panel/profile/edit"}
                                    style={{ padding: "10px" }}
                                >
                                    <Button size="small" variant="filled">
                                        EDIT
                                    </Button>
                                </Link>
                                <Logout token={token.value} />
                            </Row>
                        </Stack>
                    </Row>
                    <Hr />
                    <Suspense fallback={<Loading variant="spinner" />}>
                        {/* @ts-expect-error Server Component */}
                        <OrgsList token={token.value} />
                    </Suspense>

                    <Link
                        href={"/panel/organization/add"}
                        style={{ padding: "10px" }}
                    >
                        <Button variant="filled">Add org</Button>
                    </Link>
                </Container>
            </Main>
        </Pg>
    );
}
