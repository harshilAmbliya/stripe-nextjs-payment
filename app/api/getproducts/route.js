import {  NextResponse } from "next/server"
import { Stripe } from "stripe"

export const GET = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const prices = await stripe.prices.list({
        limit:3
    })
    return NextResponse.json(prices.data.reverse(),{status:200});
}