import { Container, Button, Row, Stack, SvgIcon } from "@yakad/ui";
import { cookies } from "next/headers";
import Image from "next/image";
import AccountIcon from "../account";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUserProfile, UserProfile } from "../profile/profile";
import LogoutButton from "../../(components)/LogoutButton";

export default async function Page() {
    const cookie = cookies();
    const token = cookie.get("token") || redirect("/account/login");

    const profile: UserProfile = await getUserProfile(token.value);

    const firstName = profile.first_name
        ? profile.first_name
        : "Empty first name";
    const lastName = profile.last_name ? profile.last_name : "Empty last name";
    const fullName = `${firstName} ${lastName}`;

    return (
        <Container size="sm">
            <Row>
                <div
                    style={{
                        display: "flex",
                    }}
                >
                    {profile.profile_image ? (
                        <Image
                            src={profile.profile_image || ""}
                            alt="Profile Image"
                            width={50}
                            height={50}
                        />
                    ) : (
                        <SvgIcon size={10}>
                            <AccountIcon />
                        </SvgIcon>
                    )}
                </div>
                <Stack style={{ gap: "0" }}>
                    <h2>{fullName}</h2>
                    <h2>{profile.username}</h2>
                    <Row>
                        <Link
                            href={`/panel/profile/edit`}
                            style={{ padding: "10px" }}
                        >
                            <Button size="small" variant="filled">
                                EDIT
                            </Button>
                        </Link>
                        <LogoutButton variant="tonal" size="small" />
                    </Row>
                </Stack>
            </Row>
        </Container>
    );
}
