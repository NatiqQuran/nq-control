import { AppBar, Main, Card, Stack, SvgIcon, Hr, Page } from "@yakad/ui/index";
import styles from "./account.module.css";
export default function Layout({ children }: any) {
    return (
        <Page className={styles.page}>
            <AppBar className={styles.header}></AppBar>
            <Main className={styles.main}>
                <Card className={styles.card}>
                    <Stack
                        className={styles.logoholder}
                        style={{
                            justifyContent: "center",
                            gap: "0",
                        }}
                    >
                        <SvgIcon size={6}></SvgIcon>
                        <h1>Natigh</h1>
                    </Stack>
                    <Hr />
                    {children}
                </Card>
            </Main>
        </Page>
    );
}
