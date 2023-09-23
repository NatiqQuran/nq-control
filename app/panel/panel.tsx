"use client";

import { Xpanel } from "@yakad/x";
import { useRouter } from "next/navigation";
import ProfileButton from "./profileButton";

export default function Panel(props: any) {
    const router = useRouter();
    const menuItems = [
        {
            name: "Overview",
            onclick: () => router.push("/panel/overview"),
        },
        {
            name: "Accounts",
            childs: [
                { name: "Users" },
                { name: "Organizations" },
                { name: "Permissions" },
            ],
        },
        {
            name: "Quran",
            childs: [
                {
                    name: "Mushafs",
                    onclick: () => router.push("/panel/mushaf/list"),
                },
                { name: "Translations" },
                { name: "By Word" },
                { name: "Tafrsir" },
                { name: "Recite" },
            ],
        },
    ];
    return (
        <Xpanel
            name="Natiq Control Panel"
            menuItems={menuItems}
            appbarChildren={<ProfileButton />}
        >
            {props.children}
        </Xpanel>
    );
}
