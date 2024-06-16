"use client";
import { XnavigationList } from "@yakad/x";
import { useRouter } from "next/navigation";

export default function NavigationItems() {
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
                { name: "Permissions", onclick: () => router.push("/panel/permission/list") },
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
            ],
        },
    ];

    return (
        <XnavigationList menuItems={menuItems} />
    );
}
