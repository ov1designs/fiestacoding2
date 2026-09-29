"use server"

import { stripe } from "@/lib/stripe"
import { DONATION_TIERS } from "@/lib/products"

export async function startCheckoutSession(productId: string) {
  const tier = DONATION_TIERS.find((t) => t.id === productId)
  if (!tier) {
    throw new Error(`Donation tier with id "${productId}" not found`)
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    submit_type: "donate",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Fiesta Coding + AI - ${tier.name} Donation`,
            description: tier.description,
          },
          unit_amount: tier.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  })

  return session.client_secret
}
