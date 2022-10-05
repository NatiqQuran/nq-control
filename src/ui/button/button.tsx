import { component$, HTMLAttributes, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./button.css?inline";

interface ButtonProps {
    variant: "text" | "outlined";
}

export default component$((props: ButtonProps) => {
    useStylesScoped$(styles);

    return <button {...props} class={{ button: true }}></button>;
});
