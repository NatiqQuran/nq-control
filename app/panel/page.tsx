import { Main, Container } from "@yakad/ui";
import { cookies } from "next/headers";

export default function Page() {
    const nextCookies = cookies();
    const token = nextCookies.get("token");

    return (
        <Main
            style={{
                position: "fixed",
                top: "6rem",
                height: "calc(100% - 6rem)",
            }}
        >
            <Container
                maxWidth="sm"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h1>
                    Your Token is : {token ? token.value : "Please Login first"}
                </h1>
            </Container>
        </Main>
    );
}
