import { Container } from "@yakad/ui";
import React from "react";
import EditMushafForm from "./editForm";
import { ApiError } from "../../../api";
import { Mushaf } from "../../mushaf";


/**
 * Returns the Mushaf Object
 */
async function viewMushaf(uuid: string): Promise<Response> {
    const response = await fetch(`${process.env.API_URL}/mushaf/${uuid}`, {
        method: "GET",
    });

    return response;
}

export default async function EditMushaf({ params: { uuid } }: { params: { uuid: string } }) {
    const response = await viewMushaf(uuid);

    if (response.status >= 400) {
        throw new ApiError(response.status);
    }

    return (
        <Container maxWidth="sm">
            <h1>Edit Mushaf</h1>
            <EditMushafForm uuid={uuid} mushaf={await response.json() as Mushaf} />
        </Container>
    );
}
