import { env } from "env.mjs";
import type { Channel } from "types";

// Error class for when the response is not ok
class ResponseError extends Error {
  response: Response;

  constructor(message: string, res: Response) {
    super(message);
    this.response = res;
  }
}

// Fetches all hololive members from Holodex API
// TODO: Respect the API's limit
export async function getAllMembers() {
  try {
    const res = await fetch(
      "https://holodex.net/api/v2/channels?org=Hololive&limit=100&sort=group",
      {
        headers: {
          "X-APIKEY": env.API_KEY,
        },
      }
    );

    if (!res.ok) throw new ResponseError("Failed to fetch members", res);

    const channels: Channel[] = await res.json();

    return channels;
  } catch (err) {
    if (err instanceof ResponseError) {
      if (err.response.status === 403) {
        console.error("API key is invalid");
      }
    }

    return [];
  }
}
