import { z } from "zod";

export const ChannelSchema = z.object({
  id: z.string(),
  name: z.string(),
  english_name: z.string().nullable(),
  type: z.string(),
  org: z.string().nullable(),
  group: z.string(),
  photo: z.string().url().nullable(),
  twitter: z.string().nullable(),
  inactive: z.boolean(),
  twitch: z.string().nullable(),
});

export type Channel = z.infer<typeof ChannelSchema>;
