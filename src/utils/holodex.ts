import { env } from "@/env";
import { Channel, ChannelSchema } from "@/models";

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

export async function getAllMembers() {
  let members: Channel[] = [];
  let offset = 0;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    try {
      const res = await fetch(
        `https://holodex.net/api/v2/channels?org=Hololive&limit=${limit}&offset=${offset}&sort=group`,
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

      members = members.concat(validatedChannels.data);

      hasMore = validatedChannels.data.length === limit;
      offset += limit;
    } catch (err) {
      if (err instanceof ResponseError) {
        if (err.response.status === 403) {
          console.error("API key is invalid");
        }
      }
      return members;
    }
  }

  return members;
}
