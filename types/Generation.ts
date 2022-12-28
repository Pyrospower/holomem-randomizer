import type { Channel } from "types";

export default interface Generation {
  name: string;
  members: Channel[];
}
