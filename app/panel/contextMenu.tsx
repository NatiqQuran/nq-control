"use client";

import { useEffect, useRef } from "react";

interface ContextMenuProps<T> {
    children: T;
    anchorEl: HTMLElement | null;
    open: boolean;
}

export default function ContextMenu(props: ContextMenuProps<JSX.Element>) {
    const ref = useRef(null);

    useEffect(() => {
        const rect = props.anchorEl
            ? props.anchorEl.getBoundingClientRect()
            : null;

        const current: HTMLElement = ref.current!;

        current.style.top = `${rect?.y! + 40}px` || "1px"; // what is going on here :\

        current.style.left =
            `${rect?.x! - current.offsetWidth + 40}px` || "1px"; // WTF

        // But it works ;)
    }, [props.anchorEl]);

    return (
        <div
            style={props.open ? { position: "fixed" } : { display: "none" }}
            ref={ref}
        >
            {props.children}
        </div>
    );
}
