import Head from "next/head";
import { FormEvent, useRef, useState } from "react";

import type { Channel, Generation } from "types";
import { GenFieldset } from "@/components/molecules";
import { Button } from "@/components/atoms";
import {
  getAllMembers,
  groupByGeneration,
  removeUnwantedChannels,
} from "@/utils/holodex";

export default function Home({ data }: { data: Channel[] }) {
  const [randomizer, setRandomizer] = useState(0);
  const formRef = useRef(null);

  // Removes official channels and sub channels
  const channels = removeUnwantedChannels(data);

  // Groups channels by generation
  let groups: Generation[] = groupByGeneration(channels, []);

  // Handles checkbox change on click
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = ev.target.checked;

    cbVerification(isChecked);
  };

  // Handles form submit
  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    formData.forEach((_value, key) => {
      console.log(key);
    });
  };

  const cbVerification = (cbIsChecked: boolean) => {
    // If box is checked, add 1
    if (cbIsChecked) {
      setRandomizer(randomizer + 1);
    }
    // If box is unchecked, remove 1
    if (!cbIsChecked && randomizer > 0) {
      setRandomizer(randomizer - 1);
    }
  };

  return (
    <div className="px-4 md:px-8">
      <Head>
        <title>holomem randomizer</title>
      </Head>

      <main className="py-6 flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-6xl mb-6">Randomizer</h1>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-4"
        >
          {/* Checkbox list */}
          <ul className="flex flex-wrap justify-center flex-col gap-y-2">
            {groups.map((group) => (
              <GenFieldset
                key={group.name}
                generation={group.members}
                handleChange={handleChange}
              >
                {group.name}
              </GenFieldset>
            ))}
          </ul>

          {/* Choose button */}
          <div className="flex justify-center">
            <Button visible={randomizer > 1 ? true : false}>Choose</Button>
          </div>
        </form>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const twoMonths = Math.ceil(30.417 * 2 * 24 * 60 * 60 * 1);

  // Calls Holodex's API endpoint to get hololive members
  const data = await getAllMembers();

  // By returning { props: { channels } }, the component
  // will receive `channels` as a prop at build time
  return {
    props: {
      data,
    },
    revalidate: twoMonths, // ISR
  };
}
