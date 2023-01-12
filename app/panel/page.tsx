import {
    Main,
    Container,
    AppBar,
    Spacer,
    Button,
    Page as Pg,
    Loading,
} from "@yakad/ui";
import { cookies } from "next/headers";
import Image from "next/image";
import AccountIcon from "./account";
import Menu from "./menu";
import Logout from "./logout";
import { redirect } from "next/navigation";
import Link from "next/link";
import OrgsList from "./organizationsList";
import { Suspense } from "react";

interface UserProfile {
    readonly username: string;
    first_name: string;
    last_name: string;
    birthday: Date;
    email: string;
    profile_image: string | null;
}

async function getUserProfile(token: string): Promise<Response> {
    const response = await fetch(`${process.env.API_URL}/profile`, {
        headers: {
            Authorization: token,
        },
    });

    return response;
}

export default async function Page() {
    const token = cookies().get("token")!;

    const profile: UserProfile = await (async () => {
        const profileFromApi = await getUserProfile(token.value);

        return profileFromApi.status === 401
            ? redirect("/login")
            : profileFromApi.json();
    })();

    return (
        <Pg style={{ position: "absolute", height: "100%" }}>
            <AppBar>
                <h1>Panel</h1>

                <Spacer />

                <Menu
                    avatar={
                        profile.profile_image ? (
                            <Image
                                src={profile.profile_image || ""}
                                alt="Profile Image"
                                width={25}
                                height={25}
                            />
                        ) : (
                            <AccountIcon />
                        )
                    }
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        {profile.profile_image ? (
                            <Image
                                width={65}
                                height={65}
                                alt=""
                                src={profile.profile_image}
                                style={{ borderRadius: "100px" }}
                            />
                        ) : (
                            "no profile image"
                        )}
                        <h3>username: {profile.username}</h3>
                        <p>email: {profile.email}</p>
                    </div>
                </Menu>
            </AppBar>
            <Main
                style={{
                    position: "fixed",
                    top: "6rem",
                    height: "calc(100% - 6rem)",
                }}
            >
                <Container
                    // maxWidth="sm"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "40rem",
                    }}
                >
                    <Suspense fallback={<Loading variant="spinner" />}>
                        <OrgsList token={token.value} />
                    </Suspense>

                    <Link
                        href={"/panel/organization/add"}
                        style={{ padding: "10px" }}
                    >
                        <Button variant="filled">Add org</Button>
                    </Link>
                    <Logout token={token.value} />
                </Container>
            </Main>
        </Pg>
    );
}
