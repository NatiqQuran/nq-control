import { Loading, Screen } from "@yakad/ui";

export default function LoadingPage() {
    return (
        <Screen
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
        </Screen>
    );
}
