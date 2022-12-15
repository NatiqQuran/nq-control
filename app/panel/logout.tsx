"use client";

import { useRouter } from "next/navigation";

async function logout(token: string): Promise<number> {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/account/logout`,
		{
			method: "GET",
			headers: {
				Authorization: token,
			},
		},
	);

	return response.status;
}

export default function Logout({ token }: { token: string }) {
	const router = useRouter();

	const handleLogout = async () => {
		const logoutStatus = await logout(token);

		// Check if logout was succesful
		if (logoutStatus === 200) {
			router.push("/");
		}
	};

	return <button onClick={handleLogout}>Logout</button>;
}
