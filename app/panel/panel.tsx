"use client";
import { Xpanel } from "@yakad/x";
import { useRouter } from "next/navigation";

export default function Panel(props: any) {
    const router = useRouter();
    const menuItems = [
        {
            name: "Overview",
            onclick: () => router.push("/test")
        },
        {
            name: "Accounts",
            childs: [
                { name: "Users" },
                { name: "Organizations" },
                { name: "Permissions" }
            ]
        },
        {
            name: "Quran",
            childs: [
                { name: "Arabic Text" },
                { name: "Translations" },
                { name: "By Word" },
                { name: "Tafrsir" },
                { name: "Recite" }
            ]
        }
    ];
    return (
        <Xpanel name="Natiq Control Panel" menuItems={menuItems}>
            {props.children}
        </Xpanel>
    );
}
