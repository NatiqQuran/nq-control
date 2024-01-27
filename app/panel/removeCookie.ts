'user server';

import { cookies } from 'next/headers'

export default async function deleteToken() {
    cookies().delete("token")
}
