import { stripe } from "@/stripe-server";

export async function POST(req: Request) {
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2025-04-30.basil" }
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 5 * 100,
    currency: "usd",
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true
    }
  });

  return Response.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY
  });
}
