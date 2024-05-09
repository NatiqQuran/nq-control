interface Props<T> extends React.HTMLAttributes<HTMLFormElement> {
    action: () => Promise<T>;
}

export default function QForm<T>(props: Props<T>) {
    return (
        <form {...props}>{props.children}</form>
    );
}
