import Link from "next/link";
import {
    AppBar,
    Main,
    SvgIcon,
    Button,
    Spacer,
    Page as Pg,
    Row,
    List,
    ListItem,
} from "@yakad/ui";
import LogoIcon from "./logoicon";
import { Xbackground, XgetStart } from "@yakad/x";

const navListItems = [
    <ListItem key={0}>
        <a href="https://natiq.net" target="_blank">
            <Button style={{ width: "100%" }}>Quran</Button>
        </a>
    </ListItem>,
    <ListItem key={1}>
        <a href="https://blog.natiq.net/about" target="_blank">
            <Button style={{ width: "100%" }}>About</Button>
        </a>
    </ListItem>,
];

export default function Page(): JSX.Element {
    return (
        <Pg>
            <AppBar style={{ gap: "1rem" }}>
                <SvgIcon size={5}>
                    <LogoIcon />
                </SvgIcon>
                <h1
                    style={{
                        fontFamily: "arial",
                        fontSize: "2.4rem",
                        fontWeight: "normal",
                        letterSpacing: "0.1rem",
                    }}
                >
                    Natiq
                </h1>
                <List>{navListItems.map((item) => item)}</List>
                <Spacer />
                <Link href="/account/login">
                    <Button variant="outlined" icon="login">
                        Login
                    </Button>
                </Link>
            </AppBar>
            <Main>
                <Xbackground variant="dotted">
                    <XgetStart logo={<LogoIcon />}>
                        <h1
                            style={{
                                fontFamily: "Hafs",
                                textAlign: "center",
                            }}
                        >
                            <span
                                style={{ fontSize: "5.5rem", color: "#aa8a59" }}
                            >
                                Natiq{" "}
                            </span>
                            <span
                                style={{
                                    fontSize: "5rem",
                                }}
                            >
                                Control Panel
                            </span>
                        </h1>
                        <p
                            style={{
                                fontFamily: "auto",
                                fontSize: "1.8rem",
                                textAlign: "center",
                            }}
                        >
                            Natiq Control Panel, Multi panel to manage natiq
                            quran app.
                            <br />
                            Based on research.
                        </p>
                        <Row align="center">
                            <a href="https://natiq.net">
                                <Button
                                    variant="filled"
                                    size="medium"
                                    style={{ margin: "auto" }}
                                >
                                    Natiq App
                                </Button>
                            </a>
                            <Link href="/panel">
                                <Button
                                    variant="filled"
                                    size="medium"
                                    style={{ margin: "auto" }}
                                >
                                    Control Panel
                                </Button>
                            </Link>
                        </Row>
                        <p style={{ fontSize: "1.4rem" }}>or</p>
                        <a
                            href="https://blog.natiq.net"
                            target="_blank"
                            style={{
                                fontSize: "1.6rem",
                                fontFamily: "cursive",
                            }}
                        >
                            Learn More!
                        </a>
                    </XgetStart>
                </Xbackground>
            </Main>
        </Pg>
    );
}
