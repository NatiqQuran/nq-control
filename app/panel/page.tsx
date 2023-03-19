import {
    Main,
    Container,
    AppBar,
    Spacer,
    Button,
    Page as Pg,
    Loading,
    Row,
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
import { getUserProfile, UserProfile } from "./profile/profile";

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
            <AppBar>
                <h1>Panel</h1>

                <Spacer />
                <Link href={"/panel/account"}>
                    <Button variant="tonal">Account</Button>
                </Link>
            </AppBar>
            <Main
                style={{
                    position: "fixed",
                    top: "6rem",
                    height: "calc(100% - 6rem)",
                }}
            ></Main>
        </Pg>
    );
}
