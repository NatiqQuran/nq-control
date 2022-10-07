import {
    component$,
    useStylesScoped$,
    Component,
    Slot,
    HTMLAttributes,
} from "@builder.io/qwik";
import Styles from "./button.css?inline";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    variant: "text" | "outlined";
}

const Button: Component<ButtonProps> = component$((props: ButtonProps) => {
    useStylesScoped$(Styles);

    return (
        <button
            {...props}
            class={{
                button: true,
                buttonOutlined: props.variant === "outlined",
                buttonText: props.variant === "text",
            }}
        >
            <Slot />
        </button>
    );
});

export default Button;
