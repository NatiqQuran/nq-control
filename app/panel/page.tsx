import { Main, Container, AppBar, Spacer, Button } from "@yakad/ui";
import { cookies } from "next/headers";
import Image from "next/image";
import AccountIcon from "./account";
import Menu from "./menu";
import Logout from "./logout";
import { redirect } from "next/navigation";

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
    const nextCookies = cookies();
    const token = nextCookies.get("token") || redirect("/login");

    const profile: UserProfile = await (async () => {
        const profileFromApi = await getUserProfile(token.value);

        return profileFromApi.status === 401
            ? redirect("/login")
            : profileFromApi.json();
    })();

    return (
        <>
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

            <Logout token={token.value} />
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
                    }}
                >
                    {profile.username}
                </Container>
            </Main>
        </>
    );
}
