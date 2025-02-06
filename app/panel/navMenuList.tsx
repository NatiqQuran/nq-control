"use client";

import { useRouter } from "next/navigation";
import { XmenuList } from "@yakad/x";

export default function NavMenuList() {
    const router = useRouter();
    const menuItems = [
        {
            name: "Overview",
            onclick: () => router.push("/panel/overview"),
        },
        {
            name: "Accounts",
            childs: [
                {
                    name: "Users",
                    onclick: () => router.push("/panel/user/list"),
                },
                { name: "Organizations" },
                {
                    name: "Permissions",
                    onclick: () => router.push("/panel/permission/list"),
                },
            ],
        },
        {
            name: "Quran",
            childs: [
                {
                    name: "Mushafs",
                    onclick: () => router.push("/panel/mushaf/list"),
                },
                {
                    name: "Translations",
                    onclick: () => router.push("/panel/translation/list"),
                },
                { name: "By Word" },
                { name: "Tafrsir" },
                { name: "Recite" },
            ],
        },
        {
            name: "Reports",
            childs: [
                {
                    name: "Errors",
                    onclick: () => router.push("/panel/error/list"),
                },
            ],
        },
        {
            name: "Manage Apps",
            childs: [
                {
                    name: "App Translation",
                    onclick: () => router.push("/panel/app_translation"),
                },
            ],
        },
    ];

    return <XmenuList items={menuItems} />;
}
