import { ADSENSE_PUBLISHER_ID } from "../../lib/site";

export const dynamic = "force-static";

/** Google's AdSense certification authority id. Same value for every publisher. */
const ADSENSE_CERTIFICATION_AUTHORITY = "f08c47fec0942fa0";

export function GET() {
  if (!/^pub-\d{16}$/.test(ADSENSE_PUBLISHER_ID)) {
    return new Response("ads.txt is not configured\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const body = `google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, ${ADSENSE_CERTIFICATION_AUTHORITY}\n`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
