export interface UserProfile {
    username: string;
    first_name: string;
    last_name: string;
    birthday: Date | string;
    profile_image: string | null;
    email: string;
}

export async function getUserProfile(token: string): Promise<Response> {
    const response = await fetch(`${process.env.API_URL}/user`, {
        headers: {
            Authorization: token
        }
    });

    return response;
}
