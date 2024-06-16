import { UserProfile } from "../panel/profile/profile";
import { Button } from "@yakad/ui";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";

export async function getUserProfile(token: string): Promise<Response> {
    const response = await fetch(`${process.env.API_URL}/profile`, {
        headers: {
            Authorization: token
        }
    });


    return response;
}

const LoginButton = () => (
    <>
        <Link href="/account/login">
            <Button variant="outlined" icon="login">
                Login
            </Button>
        </Link>
    </>
);

export default async function ProfileButton() {
    const token = cookies().get("token")?.value || "none";
    if (token === "none") {
        return <LoginButton />
    }
    const profile = await getUserProfile(token);

    if (profile.status !== 200) {
        return <LoginButton />
    }

    const profile_data: UserProfile = await profile.json();

    return (
        <>
            <Link href="/panel/account">
                {
                    profile_data.profile_image
                        ? <Button >
                            <Image style={{ borderRadius: "100px" }} width="40" height="40" src={profile_data.profile_image} alt="profile picture" />
                        </Button>
                        : <Button icon="account_circle"></Button>
                }
            </Link>
        </>
    );
}

