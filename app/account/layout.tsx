"use client";

import {
    AppBar,
    Main,
    Card,
    Stack,
    SvgIcon,
    Hr,
    Page,
    Row,
} from "@yakad/ui/index";
import styles from "./account.module.css";
import LogoIcon from "./logoicon";
export default function Layout({ children }: any) {
    return (
        <Page className={styles.page}>
            <AppBar className={styles.header}></AppBar>
            <Main className={styles.main}>
                <Card className={styles.card}>
                    <Row align="center">
                        <SvgIcon size={6}>
                            <LogoIcon />
                        </SvgIcon>
                        <h1>Natiq</h1>
                    </Row>
                    <Hr />
                    {children}
                </Card>
            </Main>
        </Page>
    );
}
