"use client";

import { Button } from "@yakad/ui";
import { useRouter } from "next/navigation";


export default function NewLang() {
    const router = useRouter();
    const btnOnClick = () => {
        const lang = prompt("Enter language Code (e.g. en):");
        if (lang?.length! > 2) throw new Error("Language code too long!");

        router.push(`/panel/app_translation/edit/${lang}`);
    }

    return <Button variant="filled" onClick={btnOnClick}>New Language support</Button>;
}
