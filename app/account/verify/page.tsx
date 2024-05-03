import { redirect } from "next/navigation";
import { verify } from "./lib";

export default function Page({ searchParams }: { searchParams: { email: string } }) {
    return (
        <>
            <form
                action={async (formData) => {
                    "use server";

                    await verify(searchParams.email, formData);

                    redirect("/panel");
                }}
            >
                <input name="code" type="number" placeholder="Code" />
                <input type="submit" value="Verify" />
            </form>
        </>
    );
}
