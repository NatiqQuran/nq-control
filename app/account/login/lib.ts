export async function sendCode(form: FormData) {
    // call /verify from api
    const response = await fetch(`${process.env.API_URL}/account/sendCode`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: form.get("email") })
        }
    );

    if (response.status !== 200) {
        throw new Error("Unsuccsessful send code!");
    }
}
