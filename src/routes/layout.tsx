import { component$, Slot } from "@builder.io/qwik";
import Header from "../components/header/header";

export default component$(() => {
    return (
        <>
            <main>
                <Header />
                <section>
                    <Slot />
                </section>
            </main>
            <h1>Hello World</h1>
            <footer>
                <a href="https://www.builder.io/" target="_blank">
                    Made with ♡ by Builder.io
                </a>
            </footer>
        </>
    );
});
