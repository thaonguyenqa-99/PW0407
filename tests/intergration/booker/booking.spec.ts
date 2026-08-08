import { test, expect } from '@playwright/test';
import * as z from "zod";

const Booking = z.object({
    bookingid: z.number()
});

test('get all the bookings', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking')

    //verify the statis code
    expect(response.status()).toBe(200)

    //verify reponse body schema <> Contract testing 
    const responseBody = await response.json()
    const expectedSchema = z.array(Booking);
    expect(expectedSchema.safeParse(responseBody).success).toBe(true);
})

test('create a new booking', async ({ request }) => {
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "firstname": "Jim",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2026-08-01",
                "checkout": "2026-08-01"
            },
            "additionalneeds": "Breakfast"
        }
    })
    expect(response.status()).toBe(200)
    const responseBody = await response.json()
    expect(responseBody).toHaveProperty('bookingid')
    expect(responseBody.booking).toEqual({
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2026-08-01",
            "checkout": "2026-08-01"
        },
        "additionalneeds": "Breakfast"
    })
})

test('update a booking successfully', async ({ request }) => {
    // Step1: get token from auth request
    const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "username": "admin",
            "password": "password123"
        }
    })
    expect(authResponse.status()).toBe(200)
    const authResponseBody = await authResponse.json()
    const token = authResponseBody.token

    // step2: get a bookings
    const getAllBookingsResponse = await request.get('https://restful-booker.herokuapp.com/booking')
    expect(getAllBookingsResponse.status()).toBe(200)
    const getAllBookingsResponseBody = await getAllBookingsResponse.json()
    // get random booking id from the list of bookings
    expect(getAllBookingsResponseBody.length).toBeGreaterThan(0)
    const random = Math.floor(Math.random() * getAllBookingsResponseBody.length);
    const bookingId = getAllBookingsResponseBody[random].bookingid

    // step3: get booking by id
    const getBookingByIdResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`)
    expect(getBookingByIdResponse.status()).toBe(200)
    const getBookingByIdResponseBody = await getBookingByIdResponse.json()
    console.log("Booking details before update: ", getBookingByIdResponseBody)

    // update the booking details
    let bookingDetailsBeforeUpdate = getBookingByIdResponseBody
    bookingDetailsBeforeUpdate.depositpaid = false

    //step 4: update booking
    const response = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token}`
        },
        data: bookingDetailsBeforeUpdate
    })
    expect(response.status()).toBe(200)
    const responseBody = await response.json()
    console.log('Booking details after update:', responseBody)
    expect(responseBody).toEqual(bookingDetailsBeforeUpdate)

})

test('delete a booking successfully', async ({ request }) => {
    // Step1: get token from auth request
    const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "username": "admin",
            "password": "password123"
        }
    })
    expect(authResponse.status()).toBe(200)
    const authResponseBody = await authResponse.json()
    const token = authResponseBody.token

    // step2: get a bookings
    const getAllBookingsResponse = await request.get('https://restful-booker.herokuapp.com/booking')
    expect(getAllBookingsResponse.status()).toBe(200)
    const getAllBookingsResponseBody = await getAllBookingsResponse.json()
    // get random booking id from the list of bookings
    expect(getAllBookingsResponseBody.length).toBeGreaterThan(0)
    const random = Math.floor(Math.random() * getAllBookingsResponseBody.length);
    const bookingId = getAllBookingsResponseBody[random].bookingid

    console.log('Booking ID to delete:', bookingId);

    // step3: delete booking by id
    const deleteBookingResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        headers: {
            'Cookie': `token=${token}`
        }
    })

    console.log('Delete status:', deleteBookingResponse.status());

    expect(deleteBookingResponse.status()).toBe(201)

    // step4: verify the booking is deleted
    const getBookingByIdResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`)
    expect(getBookingByIdResponse.status()).toBe(404)
})