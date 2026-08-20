import { test as base } from '@playwright/test';

type booker = {
    authToken: string;
    randombookingid: number;
}

export const test = base.extend<booker>({
    authToken: async ({ request }, use) => {
        const response = await request.post('https://restful-booker.herokuapp.com/auth', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "username": "admin",
                "password": "password123"
            }
        })
        const responseBody = await response.json()
        const token = responseBody.token
        await use(token)
    },
    randombookingid: async ({ request }, use) => {
        const response = await request.get('https://restful-booker.herokuapp.com/booking')
        const responseBody = await response.json()
        const random = Math.floor(Math.random() * responseBody.length)
        const bookingidrandom = responseBody[random].bookingid
        await use(bookingidrandom)
    }
});
export { expect } from '@playwright/test';