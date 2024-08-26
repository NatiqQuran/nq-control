"use client";

import { Button } from "@yakad/ui";
import { useEffect, useState } from "react";


export default function SaveBtn() {
    const [saved, setSaved] = useState(false);
    useEffect(() => {
        const id = setTimeout(() => {
            setSaved(false);
        }, 2000 /** 2 Sec's **/);

        return () => { clearTimeout(id); }
    }, [saved]);

    return <Button variant={saved ? "filledtonal" : "filled"} onClick={() => setSaved(true)}>{saved ? "Saved!" : "Save"}</Button>
}
