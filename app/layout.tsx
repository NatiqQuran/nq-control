import "../styles/style.css";
import { Theme } from "@yakad/ui";
import type { Viewport } from "next";

export const runtime = "edge";

export const metadata = {
    title: "Natiq Panel",
    description: "Natiq Control Panel",
    manifest: "manifest.json",
    viewport: "width=device-width, initial-scale=1",
    icons: "favicon.ico",
};

export const viewport: Viewport = {
    themeColor: "#222222",
};

export default function Layout({ children }: any) {
    return (
        <html>
            <body>
                <Theme color="purple">{children}</Theme>
            </body>
        </html>
    );
}
