import { Button, Container, InputField, Row, Select, Stack } from "@yakad/ui";
import { cookies } from "next/headers";
import { Permission } from "../list/page";
import BackButton from "../../../(components)/BackButton";
import { redirect } from "next/navigation";
import UsersSelect from "../../../(components)/UsersSelect";

async function addPermission(formData: FormData) {
    const requestBody: Permission = {
        subject: formData.get("subject")?.toString()!,
        object: formData.get("object")?.toString()!,
        action: formData.get("action")?.toString()! as any,
        conditions: [],
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/permission`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: cookies().get("token")?.value || "none",
        },
        body: JSON.stringify(requestBody),
    });

    if (response.status !== 200) {
        throw new Error(`Could't add new permission, ${await response.text()}`);
    }
}

export default function Page() {
    return (
        <Container maxWidth="sm">
            <h1>Add new Permission</h1>

            <form
                style={{ width: "100%" }}
                action={async (formData) => {
                    "use server";
                    await addPermission(formData);
                    redirect("/panel/permission/list");
                }}
            >
                <Stack>
                    <UsersSelect
                        placeholder="Subject"
                        name="subject"
                    />
                    <InputField
                        variant="outlined"
                        placeholder="Object"
                        type="string"
                        name="object"
                    />
                    
                    <Select name="action" placeholder="Action">
                        <option value="create">Create</option>
                        <option value="view">View</option>
                        <option value="delete">Delete</option>
                        <option value="edit">Edit</option>
                    </Select>

                    <Row align="end">
                        <BackButton>Cancel</BackButton>
                        <Button loadingVariant="spinner" variant="filled">
                            Add
                        </Button>
                    </Row>
                </Stack>
            </form>
        </Container>
    );
}
