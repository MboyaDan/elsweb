/** Rate limiting (Upstash REST, optional) and Turnstile verification (optional). */

export async function rateLimited(ip: string, limit = 5, windowSec = 600): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return false; // not configured: rely on honeypot, minimum time and Turnstile
  const key = `lead:${ip}`;
  try {
    const call = async (cmd: (string | number)[]) => {
      const r = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(cmd),
      });
      return (await r.json()) as { result?: number };
    };
    const { result } = await call(["INCR", key]);
    if (result === 1) await call(["EXPIRE", key, windowSec]);
    return typeof result === "number" && result > limit;
  } catch (err) {
    console.error(JSON.stringify({ event: "rate_limit_check_failed", error: String(err) }));
    return false; // fail open so a Redis outage does not block real enquiries
  }
}

export async function turnstileOk(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const j = (await r.json()) as { success?: boolean };
    return j.success === true;
  } catch (err) {
    console.error(JSON.stringify({ event: "turnstile_check_failed", error: String(err) }));
    return false;
  }
}
