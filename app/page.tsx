import Link from "next/link";
import {
    AppBar,
    Main,
    SvgIcon,
    Button,
    Spacer,
    Page,
    Row,
    List,
    ListItem,
    DisplayOnScreen,
} from "@yakad/ui";
import LogoIcon from "./logoicon";
import { Xbackground, XgetStart } from "@yakad/x";
import ProfileButton from "./(components)/ProfileButton";
import Symbol from "@yakad/symbols";

const navList = [
    { name: "Quran", link: "https://natiq.net" },
    { name: "About", link: "https://blog.natiq.net/about" },
];

export default async function Intro() {
    return (
        <Page>
            <AppBar style={{ gap: "1rem" }}>
                <DisplayOnScreen largerThan="md">
                    <SvgIcon size={5}>
                        <LogoIcon />
                    </SvgIcon>
                </DisplayOnScreen>
                <DisplayOnScreen smallerOrEqualTo="md">
                    <Button icon={<Symbol icon="menu" />} />
                </DisplayOnScreen>
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
                <DisplayOnScreen largerThan="md">
                    <List>
                        {navList.map((item, index) => (
                            <ListItem key={index}>
                                <a href={item.link} target="_blank">
                                    <Button style={{ width: "100%" }}>
                                        {item.name}
                                    </Button>
                                </a>
                            </ListItem>
                        ))}
                    </List>
                </DisplayOnScreen>
                <Spacer />
                <ProfileButton />
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
        </Page>
    );
}
