import { Loading, Page } from "@yakad/ui";

export default function LoadingPage() {
    return (
        <Page
            style={{
                position: "fixed",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
            }}
        >
            <Loading variant="scaleOut" />
        </Page>
    );
}
