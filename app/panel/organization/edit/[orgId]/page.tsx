import { Container } from "@yakad/ui";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Organization } from "../../../organization";
import EditForm from "./editForm";

async function viewOrg(id: string, token: string) {
    const response = await fetch(`${process.env.API_URL}/organizations/${id}`, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    });

    return response.json();
}

export default async function EditOrg({
    params: { orgId },
}: {
    params: { orgId: string };
}) {
    const token = cookies().get("token")?.value || redirect("/account/login");

    const currentOrgData = await viewOrg(orgId, token);
    const organization: Organization = {
        username: currentOrgData.username,
        name: currentOrgData.name,
        profile_image: currentOrgData.profile_image,
        national_id: currentOrgData.national_id,
        established_date: currentOrgData.established_date,
    };

    return (
        <Container>
            <EditForm orgData={organization} orgId={orgId} token={token} />
        </Container>
    );
}
