import { Button } from "@yakad/ui";
import { ButtonProps } from "@yakad/ui/button/button";
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

interface DeleteButtonProps extends ButtonProps {
    controller: string;
    uuid: string;
}

export default function DeleteButton(props: DeleteButtonProps) {
    const { controller, uuid, ...restOfProps } = props;

    return (
        <form action={async () => {
            "use server";

            await del(props.controller, props.uuid)
        }}>
            <Button {...restOfProps}>Delete</Button>
        </form>
    );
}
