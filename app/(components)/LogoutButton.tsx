import { Button } from "@yakad/ui";
import { ButtonProps } from "@yakad/ui";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function logout() {
    const token = cookies().get("token") || redirect("/account/login");

    const result = await fetch(`${process.env.API_URL}/account/logout`, {
        method: "GET",
        headers: {
            Authorization: token.value,
        },
    });

    if (result.status === 200) {
        cookies().delete("token");
    }

    redirect("/");
}

export default async function LogoutButton(props: ButtonProps) {
    return (
        <form
            action={async () => {
                "use server";
                await logout();
            }}
        >
            <Button {...props}>Logout</Button>
        </form>
    );
}
