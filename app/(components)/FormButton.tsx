import { ReactNode } from "react";

/**
 * This is a small form for handling buttons with 'use server' onclicks.
 * 
 * NOTE: This function is a temporary solution.
 */
export default function FormButton<T>({ onClick, children}: { onClick: () => Promise<T>, children: ReactNode}) {

    return (
        <form action={onClick}>
            {children}
        </form>
    );
}
