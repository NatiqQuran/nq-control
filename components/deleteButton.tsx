"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useFetch, useFormDataHandle } from "@yakad/lib";
import { Button, Container, Form, InputField, Row, Spacer } from "@yakad/ui";

interface DeleteButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    controller: string;
    uuid: string;
    name: string;
}

export default function DeleteButton(props: DeleteButtonProps) {
    const fetch = useFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/?{props.controller/?{props.uuid}`,
        {
            method: "DELETE",
        }
    );

    function deleteConfirm() {
        if (
            confirm(
                "Are you sure to delete (" +
                    props.name +
                    ") " +
                    props.controller +
                    "?"
            ) == true
        ) {
            fetch.send;
        } else {
            fetch.loading;
        }
    }
    return (
        <Button
            onClick={deleteConfirm}
            size="small"
            loadingVariant="spinner"
            variant="link"
        >
            Delete
        </Button>
    );
}
