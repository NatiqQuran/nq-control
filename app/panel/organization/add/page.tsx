import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddNewOrgForm from "./form";

export const runtime = "edge";

export default function Page() {
    const token = cookies().get("token")?.value || redirect("/account/login");

    return <AddNewOrgForm token={token} />;
}
