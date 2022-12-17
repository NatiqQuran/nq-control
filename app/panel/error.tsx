"use client";

import { useEffect } from "react";

export default function ErrorPage({ error }: any) {
	useEffect(() => {
		alert(error);
	}, []);

	return <h1>Error Happend</h1>;
}
