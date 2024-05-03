import { cookies } from "next/headers";

export async function verify(email: string, form: FormData) {
    // call /verify from api
    const response = await fetch(`${process.env.API_URL}/account/verify`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code: parseInt(form.get("code")?.toString() || "000000"), email: email })
        }
    );

    console.log(response.status, JSON.stringify({ code: form.get("code"), email: email }), email)

    const responseBody = await response.text();

    if (response.status !== 200) {
        throw new Error(`Unsuccsessful verify! ${responseBody}`);
    }

    cookies().set("token", responseBody);
}
