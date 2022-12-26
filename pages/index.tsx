import Head from "next/head";
import { FormEvent, useEffect, useRef, useState } from "react";

import type { Channel } from "types";
import { GenFieldset } from "@/components/molecules";
import { Button } from "@/components/atoms";

export default function Home({ channels }: { channels: Channel[] }) {
  const [randomizer, setRandomizer] = useState<number>(0);
  const formRef = useRef(null);

  // Removes hololive English Channel and sub channels
  // TODO: Transform this into a function
  const data = channels.filter(
    (elem) =>
      elem.english_name &&
      !elem.english_name.includes("(Sub)") &&
      !elem.english_name.includes("Sub Channel") &&
      !elem.english_name.includes("SubCh")
  );

  // Sorts by generation
  const gen0 = data.filter((holomem) => holomem.group === "0th Generation");
  const gen1 = data.filter((holomem) => holomem.group === "1st Generation");
  const gen2 = data.filter((holomem) => holomem.group === "2nd Generation");
  const gamers = data.filter((holomem) => holomem.group === "GAMERS");
  const gen3 = data.filter((holomem) => holomem.group.includes("Fantasy"));
  const gen4 = data.filter((holomem) => holomem.group.includes("holoForce"));
  const gen5 = data.filter((holomem) => holomem.group.includes("holoFive"));
  const gen6 = data.filter((holomem) => holomem.group.includes("holoX"));

  const holoMyth = data.filter((holomem) => holomem.group.includes("Myth"));
  const projectHope = data.filter((holomem) => holomem.english_name === "IRyS");
  const holoCouncil = data.filter(
    (holomem) =>
      holomem.group.includes("Council") && holomem.english_name !== "IRyS"
  );

  const gen1ID = data.filter((holomem) => holomem.group.includes("AREA 15"));
  const gen2ID = data.filter((holomem) => holomem.group.includes("holoro"));
  const gen3ID = data.filter((holomem) => holomem.group.includes("holoh3ro"));

  const gen1Stars = data.filter(
    (holomem) => holomem.group === "HOLOSTARS 1st Gen"
  );
  const gen2Stars = data.filter((holomem) =>
    holomem.group.includes("SunTempo")
  );
  const gen3Stars = data.filter((holomem) => holomem.group.includes("TriNero"));
  const uproar = data.filter((holomem) => holomem.group.includes("UPROAR"));
  const tempus = data.filter((holomem) => holomem.group.includes("TEMPUS"));

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
            {/* JP */}
            <GenFieldset generation={gen0} handleChange={handleChange}>
              Generation 0
            </GenFieldset>
            <GenFieldset generation={gen1} handleChange={handleChange}>
              1st Generation
            </GenFieldset>
            <GenFieldset generation={gen2} handleChange={handleChange}>
              2nd Generation
            </GenFieldset>
            <GenFieldset generation={gamers} handleChange={handleChange}>
              GAMERS
            </GenFieldset>
            <GenFieldset generation={gen3} handleChange={handleChange}>
              3rd Generation
            </GenFieldset>
            <GenFieldset generation={gen4} handleChange={handleChange}>
              4th Generation
            </GenFieldset>
            <GenFieldset generation={gen5} handleChange={handleChange}>
              5th Generation
            </GenFieldset>
            <GenFieldset generation={gen6} handleChange={handleChange}>
              holoX
            </GenFieldset>

            {/* EN */}
            <GenFieldset generation={holoMyth} handleChange={handleChange}>
              Myth
            </GenFieldset>
            <GenFieldset generation={projectHope} handleChange={handleChange}>
              Project: HOPE
            </GenFieldset>
            <GenFieldset generation={holoCouncil} handleChange={handleChange}>
              Council
            </GenFieldset>

            {/* ID */}
            <GenFieldset generation={gen1ID} handleChange={handleChange}>
              holoID1
            </GenFieldset>
            {/* ID 2nd Generation */}
            <GenFieldset generation={gen2ID} handleChange={handleChange}>
              holoID2
            </GenFieldset>
            {/* ID 3rd Generation */}
            <GenFieldset generation={gen3ID} handleChange={handleChange}>
              holoID3
            </GenFieldset>

            {/* HOLOSTARS */}
            <GenFieldset generation={gen1Stars} handleChange={handleChange}>
              HOLOSTARS 1st Generation
            </GenFieldset>
            <GenFieldset generation={gen2Stars} handleChange={handleChange}>
              HOLOSTARS 2nd Generation
            </GenFieldset>
            <GenFieldset generation={gen3Stars} handleChange={handleChange}>
              HOLOSTARS 3rd Generation
            </GenFieldset>
            <GenFieldset generation={uproar} handleChange={handleChange}>
              UPROAR!!
            </GenFieldset>
            <GenFieldset generation={tempus} handleChange={handleChange}>
              TEMPUS
            </GenFieldset>
          </ul>

          {/* Choose button */}
          <div className="flex justify-center">
            {randomizer > 1 && <Button>Choose</Button>}
          </div>
        </form>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const twoMonths = Math.ceil(30.417 * 2 * 24 * 60 * 60 * 1);

  // Calls Holodex's API endpoint to get hololive members
  const res = await fetch(
    "https://holodex.net/api/v2/channels?org=Hololive&limit=100&sort=suborg&offset=4&type=vtuber"
  );
  const channels: Channel[] = await res.json();

  // By returning { props: { channels } }, the component
  // will receive `channels` as a prop at build time
  return {
    props: {
      channels,
    },
    revalidate: twoMonths, // ISR
  };
}
