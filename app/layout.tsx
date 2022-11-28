import "../styles/color.css";
import "../styles/form.css";
import "../styles/scrollbar.css";
import "../styles/style.css";

export default function Layout({ children }: any) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
