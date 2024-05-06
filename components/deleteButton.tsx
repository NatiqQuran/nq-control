import { cookies } from "next/headers";

interface DeleteButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    controller: string;
    uuid: string;
    itemName: string;
}

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

export default function DeleteButton(props: DeleteButtonProps) {
    return (
        <button
            onClick={async () => {
                "use server";
                await del(props.controller, props.uuid);
            }}
        >
            Delete
        </button>
    );
}
