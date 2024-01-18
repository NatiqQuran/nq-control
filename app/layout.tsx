import "../styles/style.css";
import { Theme } from "@yakad/ui";

export const runtime = "edge";

export const metadata = {
    title: "Natiq Panel",
    description: "Natiq Control Panel",
    themeColor: "#222222",
    manifest: "manifest.json",
    viewport: "width=device-width, initial-scale=1",
    icons: "favicon.ico",
}

export default function Layout({ children }: any) {
    return (
        <html>
            <body>
                <Theme mode="system">{children}</Theme>
            </body>
        </html>
    );
}
