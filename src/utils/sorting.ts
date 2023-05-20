import type { Channel, Generation } from "src/types";

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
