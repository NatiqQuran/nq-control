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
                { name: "Users" },
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
                { name: "Translations" },
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
                {
                    name: "Errors Xtable",
                    onclick: () => router.push("/panel/error/listXtable"),
                },
                {
                    name: "Errors XdataMap",
                    onclick: () => router.push("/panel/error/listXdataMap"),
                },
            ],
        },
    ];

    return <XmenuList menuItems={menuItems} />;
}
