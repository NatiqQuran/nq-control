"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function del(controller: string, uuid: string) {
    const response = await fetch(`${process.env.API_URL}/${controller}/${uuid}`,
        {
            method: "DELETE",
            headers: {
                Authorization: cookies().get("token")?.value || "none"
            }
        }
    );

    if (response.status !== 200) {
        throw new Error(`Could't Delete ${controller}!, ${await response.text()}`);
    }
}

export async function deleteAction(controller: string, uuid: string, redirectTo: string | null, pagePath: string) {

    await del(controller, uuid)
    if (redirectTo) {
        revalidatePath(pagePath);
        redirect(redirectTo);
    } else {
        revalidatePath(pagePath);
    }

}
