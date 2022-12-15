"use client";

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
			<button onClick={handleButtonClick}>{avatar}</button>
			<ContextMenu anchorEl={anchorEl} open={open}>
				<div
					style={{
						boxShadow: "0 0 5px #7d7d7d7d",
						background: "#fff",
						borderRadius: "5px",
						padding: "5px",
						width: "15rem",
					}}
				>
					{children}
				</div>
			</ContextMenu>
		</div>
	);
}
