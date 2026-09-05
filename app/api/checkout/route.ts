import Stripe from "stripe";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const origin = req.headers.get("origin") ?? new URL(req.url).origin;

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      success_url: `${origin}/dashboard/settings?success=true`,
      cancel_url: `${origin}/dashboard/settings?canceled=true`,
      customer_email: session.user.email,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
  }
}
