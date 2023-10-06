import { NextResponse } from "next/server"
import { Stripe } from "stripe"


export const POST = async (req) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let data = await req.json();
    let priceId = data.priceId;
    console.log(data)
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                quantity: 1,
            }
        ],
        mode: "payment",
        success_url: `http://localhost:3000`,
        cancel_url: `http://localhost:3000`,
    })


    return NextResponse.json(session.url)
}