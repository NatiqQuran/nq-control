import Link from "next/link";
import {
    AppBar,
    Main,
    Container,
    GridContainer,
    GridItem,
    SvgIcon,
    Stack,
    Button,
    Spacer,
    Page as Pg,
} from "@yakad/ui";
import LogoIcon from "./logoicon";

export default function Page() {
    return (
        <Pg style={{ position: "absolute", height: "100%" }}>
            <Main>
                <AppBar>
                    <SvgIcon size={5}>
                        <LogoIcon />
                    </SvgIcon>
                    <h1 style={{ fontWeight: "bold", marginInlineEnd: "2rem" }}>
                        Natiq Panel
                    </h1>

                    <Spacer />
                    <Link href="/account/login">
                        <Button variant="tonal">Login</Button>
                    </Link>
                </AppBar>
                <Container maxWidth="lg">
                    <GridContainer>
                        <GridItem md={12} xl={5}>
                            <SvgIcon
                                style={{ maxWidth: "40rem", margin: "auto" }}
                            >
                                <LogoIcon />
                            </SvgIcon>
                        </GridItem>
                        <GridItem
                            md={12}
                            xl={7}
                            style={{
                                alignItems: "center",
                                display: "flex",
                                paddingRight: "3rem",
                            }}
                        >
                            <Stack
                                style={{ width: "100%", alignItems: "center" }}
                            >
                                <span style={{ display: "flex" }}>
                                    <h1
                                        style={{
                                            fontSize: "7rem",
                                            fontFamily: "Hafs",
                                        }}
                                    >
                                        <span>الْقُرآنُ </span>
                                        <span style={{ color: "#aa8a59" }}>
                                            النّاطِق
                                        </span>
                                    </h1>
                                </span>
                                <p
                                    style={{
                                        textAlign: "justify",
                                        textAlignLast: "center",
                                        fontSize: "1.6rem",
                                        lineHeight: "2rem",
                                    }}
                                >
                                    Quran Natigh, Recitation, Word by Word,
                                    Translate & Tafsir. Based on research.
                                </p>

                                <Link href="/panel">
                                    <Button variant="filled">Open Panel</Button>
                                </Link>
                            </Stack>
                        </GridItem>
                    </GridContainer>
                </Container>
            </Main>
        </Pg>
    );
}
