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
import { Xpanel } from "@yakad/x";

export default async function Page() {
    const cookie = cookies();
    const token = cookie.get("token") || redirect("/account/login");

    const profile= await (async () => {
        const profileFromApi = await getUserProfile(token.value);

        return profileFromApi.status === 401
            ? redirect("/account/login")
           : profileFromApi.json();
    })();
    var menuItems = [
        {
            name: "Profile",
        },
        {
            name: "Accounts",
            childs: [
                {name: "Users"},
                {name: "Organizations"},
                {name: "Permissions"}
            ],
        },
        {
            name: "Quran",
            childs: [
                {name: "Arabic Text"},
                {name: "Translations"},
                {name: "By Word"},
                {name: "Tafrsir"},
                {name: "Recite"}
            ],
        }
    ]
    
    return (
        <Xpanel name="Natiq Control Panel" menuItems={menuItems} ></Xpanel>
    );
}
