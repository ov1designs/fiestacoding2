export async function POST(req: Request) {
  try {
    const payload = await req.json()

    const webhook = process.env.GS_WEBHOOK_URL
    if (!webhook) {
      return new Response("Missing GS_WEBHOOK_URL env var", { status: 500 })
    }

    const r = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    })

    const text = await r.text()
    return new Response(text, {
      status: r.ok ? 200 : 500,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
