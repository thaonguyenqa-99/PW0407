import { test, expect } from './booker.fixture'
import * as z from "zod"
const booking = z.object({
    bookingid: z.number()
});

test('get all bookings', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking');
    expect(response.status()).toBe(200)
    const responsebody = await response.json()
    const expectedschema = z.array(booking)
    expect(expectedschema.safeParse(responsebody).success).toBe(true)
})

test('Create a booking', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        headers: {
            'Content-Type': 'application/json'
        },

        data: {
            "firstname": "Thao",
            "lastname": "Nguyen",
            "totalprice": 99,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2026-08-20",
                "checkout": "2026-08-22"
            },
            "additionalneeds": "Breakfast"
        }
    })
    expect(response.status()).toBe(200)
    const responsebody = await response.json()
    console.log(responsebody)

    expect(responsebody).toHaveProperty('bookingid')
    expect(responsebody.booking).toEqual({
        "firstname": "Thao",
        "lastname": "Nguyen",
        "totalprice": 99,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-08-20",
            "checkout": "2026-08-22"
        },
        "additionalneeds": "Breakfast"
    })
});

test('Update a booking', async ({ request, authToken, randombookingid }) => {
    const token = authToken;
    const bookingid = randombookingid;

    //step3: get booking by id
    const getbookingbyidresponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingid}`);
    expect(getbookingbyidresponse.status()).toBe(200)
    const getbookingbyidresponsebody = await getbookingbyidresponse.json()
    console.log("booking before update: ", getbookingbyidresponsebody)

    //step 4: update a booking
    const updatebookingresponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingid}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token}`
        },
        data: {
            "firstname": "Thao",
            "lastname": "Nguyen",
            "totalprice": 99,
            "depositpaid": false,
            "bookingdates": {
                "checkin": "2026-08-19",
                "checkout": "2026-08-20"
            },
            "additionalneeds": "Breakfast Buffet"
        }
    })
    expect(updatebookingresponse.status()).toBe(200);
    const updatebookingresponsebody = await updatebookingresponse.json();
    expect(updatebookingresponsebody).toEqual({
        "firstname": "Thao",
        "lastname": "Nguyen",
        "totalprice": 99,
        "depositpaid": false,
        "bookingdates": {
            "checkin": "2026-08-19",
            "checkout": "2026-08-20"
        },
        "additionalneeds": "Breakfast Buffet"
    })
    console.log('booking after apdate:', updatebookingresponsebody)
})

test('Delete a booking', async ({ request, authToken, randombookingid }) => {
    const token = authToken;
    const bookingid = randombookingid

    // // create a booking to delete
    // const response = await request.post('https://restful-booker.herokuapp.com/booking', {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     data: {
    //         "firstname": "Thao",
    //         "lastname": "Nguyen",
    //         "totalprice": 99,
    //         "depositpaid": true,
    //         "bookingdates": {
    //             "checkin": "2026-08-20",
    //             "checkout": "2026-08-22"
    //         },
    //         "additionalneeds": "Breakfast"
    //     }
    // })
    // expect(response.status()).toBe(200)
    // const responsebody = await response.json()
    // console.log(responsebody)
    // const bookingid = responsebody.bookingid


    //delete booking by bookingidrandom
    const deletebookingresponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingid}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token}`
        },

    })
    expect(deletebookingresponse.status()).toBe(201)
    const getbookingdeletedresponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingid}`)
    expect(getbookingdeletedresponse.status()).toBe(404)
})
