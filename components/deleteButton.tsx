"use client";

import React, { useEffect } from "react";
import { useFetch } from "@yakad/lib";
import { Button } from "@yakad/ui";
import { useRouter } from "next/navigation";

interface DeleteButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    controller: string;
    uuid: string;
    itemName: string;
}

export default function DeleteButton(props: DeleteButtonProps) {
    const router = useRouter();

    const fetch = useFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${props.controller}/${props.uuid}`,
        {
            method: "DELETE",
        }
    );

    useEffect(() => {
        if (fetch.isResponseBodyReady && fetch.response) {
            router.refresh();
        }
    }, [fetch.isResponseBodyReady]);

    function confirmDelete() {
        if (confirm("Are you sure to delete: " + props.itemName)) {
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
