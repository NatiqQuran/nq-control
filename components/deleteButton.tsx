"use client";

import { Button, Container, Form, InputField, Row, Spacer } from "@yakad/ui";
import { useRouter } from "next/navigation";
import { useFetch, useFormDataHandle } from "@yakad/lib";
import React from "react";

interface Delete {
    controller: string;
    uuid: string;
}

export default function DeleteButton() {
    const router = useRouter();
    const [formData, setFormData] = React.useState<Delete>();

    const fetch = useFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/?{controller/?{uuid}`,
        {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }
    );

    const handler = useFormDataHandle(setFormData);
    function deleted() {
        if (confirm("Are you sure to delete a uuid") == true) {
            fetch.send;
            console.log("Deleted");
        } else {
            fetch.loading;
            console.log("Canceled");
        }
    }
    return (
        // <Container maxWidth="sm">
        //     <h1>Delete</h1>

        //     <Form onChange={handler.handle} onSubmit={fetch.send}>
        //         <InputField
        //             variant="outlined"
        //             placeholder="Controller"
        //             type="string"
        //             name="controller"
        //         />
        //         <p>The name of controller like mushaf, suarah & ...</p>
        //         <InputField
        //             variant="outlined"
        //             placeholder="UUID"
        //             type="string"
        //             name="uuid"
        //         />
        //         <p>The mushaf, surah or ... uuid</p>
        //     </Form>
        // </Container>
        <Button
            onClick={deleted}
            size="small"
            loadingVariant="spinner"
            variant="link"
        >
            Delete
        </Button>
    );
}
