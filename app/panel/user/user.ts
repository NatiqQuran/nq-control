export interface User {
    uuid: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    birthday: string;
    profile_image?: string;
    language: string;
}

export async function getUser(token: string, user_uuid: string): Promise<User> {
    const response = await fetch(`${process.env.API_URL}/user/${user_uuid}`, {
        headers: {
            Authorization: token,
        },
    });

    if (response.status !== 200) {
        throw new Error(`Could't get user, ${await response.text()}`);
    }

    return response.json();
}

export async function getUserList(token: string): Promise<User[]> {
    const response = await fetch(`${process.env.API_URL}/user`, {
        headers: {
            Authorization: token,
        },
    });

    if (response.status !== 200) {
        throw new Error(`Could't get users list, ${await response.text()}`);
    }

    return response.json();
}
