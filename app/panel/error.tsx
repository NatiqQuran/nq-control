"use client";

import { useEffect } from "react";

export default function ErrorPage({ error }: any) {
	useEffect(() => {
		console.log(error);
	}, []);

	return <h1>Error Happend</h1>;
}
