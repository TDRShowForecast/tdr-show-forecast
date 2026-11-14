import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "jsr:@supabase/server@^1";

// Auth stays enabled. This diagnostic fetches one fixed public resource only.
export default {
  fetch: withSupabase({ auth: ["publishable", "secret"] }, async () => {
    const source = "https://www.tokyodisneyresort.jp/robots.txt";
    const retrievedAt = new Date().toISOString();
    try {
      const response = await fetch(source, {
        headers: { "User-Agent": "TDRShowForecast/0.4 (+https://github.com/TDRShowForecast/tdr-show-forecast; unofficial)" },
        redirect: "error",
        signal: AbortSignal.timeout(20000),
      });
      const body = await response.text();
      return Response.json({
        source, retrieved_at: retrievedAt,
        ok: response.ok, upstream_status: response.status,
        bytes: new TextEncoder().encode(body).length,
        policy: response.ok ? body : null,
      });
    } catch (error) {
      return Response.json({source, retrieved_at: retrievedAt, ok: false,
        error_type: error instanceof Error ? error.name : "UnknownError"}, {status: 502});
    }
  }),
};
