import { Button } from "@yakad/ui";
import { cookies } from "next/headers";

async function del(controller: string, uuid: string) {
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

export default function Delete({controller, uuid}: {controller: string, uuid: string}) {
    return (
        <form action={async () => {
            "use server";

            await del(controller, uuid)
        }}>
            <Button variant="link" size="small">Delete</Button>
        </form>
    );
}
