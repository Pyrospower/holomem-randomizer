import { z } from "zod";

import { ChannelSchema } from "./Channel";

export const GenerationSchema = z.object({
  name: z.string(),
  members: z.array(ChannelSchema),
});

export type Generation = z.infer<typeof GenerationSchema>;
