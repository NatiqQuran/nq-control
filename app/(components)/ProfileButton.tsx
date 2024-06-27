import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@yakad/ui";
import Symbol from "@yakad/symbols";
import { UserProfile } from "../panel/profile/profile";

export async function getUserProfile(token: string): Promise<Response> {
    const response = await fetch(`${process.env.API_URL}/profile`, {
        headers: {
            Authorization: token,
        },
    });

    return response;
}

const LoginButton = () => (
    <>
        <Link href="/account/login">
            <Button variant="outlined" icon={<Symbol icon="login" />}>
                Login
            </Button>
        </Link>
    </>
);

export default async function ProfileButton() {
    const token = cookies().get("token")?.value || "none";
    if (token === "none") {
        return <LoginButton />;
    }
    const profile = await getUserProfile(token);

    if (profile.status !== 200) {
        return <LoginButton />;
    }

    const profile_data: UserProfile = await profile.json();

    return (
        <>
            <Link href="/panel/account">
                {profile_data.profile_image ? (
                    <Button>
                        <Image
                            style={{ borderRadius: "50%" }}
                            width="40"
                            height="40"
                            src={profile_data.profile_image}
                            alt="profile picture"
                        />
                    </Button>
                ) : (
                    <Button icon={<Symbol icon="account_circle" />} />
                )}
            </Link>
        </>
    );
}
