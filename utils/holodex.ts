import { env } from "env.mjs";
import type { Channel, Generation } from "types";

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

    const channels: Channel[] = await res.json();

    return channels;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Removes official channels and sub channels
export function removeUnwantedChannels(channels: Channel[]) {
  return channels.filter(
    (channel) =>
      channel.english_name &&
      channel.group !== "Official" &&
      !channel.english_name.match(/Sub[^a]/g) &&
      !channel.english_name.includes("Midnight Grand Orchestra")
  );
}

// Groups channels by generation
export function groupByGeneration(channels: Channel[], groups: Generation[]) {
  for (let i = 0; i < channels.length; i++) {
    const holomem = channels[i];

    // Find the generation in the groups array
    const generation = groups.find((group) => group.name === holomem.group);

    // If the generation doesn't exist, create it and add the member to it
    if (!generation) {
      groups.push({
        name: holomem.group,
        members: [holomem],
      });
    } else {
      // If the generation exists, add the member to it
      generation.members.push(holomem);
    }
  }

  return groups;
}
