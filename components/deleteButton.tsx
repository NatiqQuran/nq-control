"use client";

import React from "react";
import { useFetch, useFormDataHandle } from "@yakad/lib";
import { Button, Container, Form, InputField, Row, Spacer } from "@yakad/ui";

interface DeleteButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    controller: string;
    uuid: string;
    itemName: string;
}

export default function DeleteButton(props: DeleteButtonProps) {
    const fetch = useFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${props.controller}/${props.uuid}`,
        {
            method: "DELETE",
        }
    );

    function confirmDelete() {
        if (confirm("Are you sure to delete: " + props.itemName) == true) {
            fetch.send();
        }
    }
    return (
        <Button
            onClick={confirmDelete}
            size="small"
            loadingVariant="spinner"
            variant="link"
            disabled={fetch.loading}
        >
            Delete
        </Button>
    );
}
