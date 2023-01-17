"use client";

import { Card, Button } from "@yakad/ui";
import React, { useState } from "react";
import ContextMenu from "./contextMenu";

interface MenuProps {
    children: JSX.Element;
    avatar: JSX.Element;
}

export default function Menu({ children, avatar }: MenuProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
        setOpen((p) => !p);
    };

    return (
        <div>
            <Button variant="filled" onClick={handleButtonClick}>
                {avatar}
            </Button>
            <ContextMenu anchorEl={anchorEl} open={open}>
                <Card>{children}</Card>
            </ContextMenu>
        </div>
    );
}
