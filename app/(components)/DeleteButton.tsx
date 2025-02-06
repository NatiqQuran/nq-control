"use client";

import { Button } from "@yakad/ui";
import { ButtonProps } from "@yakad/ui";
import { deleteAction } from "../lib";

interface DeleteButtonProps extends ButtonProps {
    controller: string;
    uuid: string;
    pagePath: string;
    redirectTo?: string;
}

export default function DeleteButton(props: DeleteButtonProps) {
    const { redirectTo, controller, uuid, pagePath, ...restOfProps } = props;

    return (
        <form
            action={() => {
                if (confirm(`Are you sure to delete this ${controller}?`)) {
                    deleteAction(controller, uuid, redirectTo!, pagePath);
                }
            }}
        >
            <Button {...restOfProps}>Delete</Button>
        </form>
    );
}
