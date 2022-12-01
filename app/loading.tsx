import { Main } from "@yakad/ui";
import { Loading } from "@yakad/ui";

export default function Loadingg() {
    return (
        <Main
            style={{
                position: "fixed",
                height: "100%",
                display: "fixed",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Loading variant="dots" size="large" />
        </Main>
    );
}
