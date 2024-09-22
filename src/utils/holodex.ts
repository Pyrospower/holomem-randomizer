import { env } from "@/env";
import { ChannelSchema } from "@/types";

/** Error class for when the response is not ok */
class ResponseError extends Error {
  response: Response;

  constructor(message: string, res: Response) {
    super(message);
    this.response = res;
  }
}

/**
 * Represents the time in seconds before the data is revalidated.
 * Currently set to 2 months.
 * @see https://nextjs.org/docs/app/building-your-application/caching#time-based-revalidation
 */
const REVALIDATION_TIME_SECONDS = Math.ceil(30.417 * 2 * 24 * 60 * 60);

// TODO: Respect the API's limit
export async function getAllMembers() {
  try {
    const res = await fetch(
      "https://holodex.net/api/v2/channels?org=Hololive&limit=100&sort=group",
      {
        headers: {
          "X-APIKEY": env.API_KEY,
        },
        next: { revalidate: REVALIDATION_TIME_SECONDS },
      },
    );

    if (!res.ok) throw new ResponseError("Failed to fetch members", res);

    const channels: unknown = await res.json();

    const validatedChannels = ChannelSchema.array().safeParse(channels);

    if (!validatedChannels.success)
      throw new ResponseError("API response is invalid", res);

    return validatedChannels.data;
  } catch (err) {
    if (err instanceof ResponseError) {
      if (err.response.status === 403) {
        console.error("API key is invalid");
      }
    }

    return [];
  }
}
