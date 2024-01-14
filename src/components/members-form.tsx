"use client";
import { useRef, useState } from "react";
import { Channel, Generation } from "src/types";
import { groupByGeneration } from "src/utils/sorting";
import { Button } from "@/components/ui/button";
import { Dices } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

// might need to use randomizer and handleSubmit as props
interface FormProps {
  data: Channel[];
}

export default function Form({ data: members }: FormProps) {
  const [randomizer, setRandomizer] = useState(0);
  const formRef = useRef(null);

  // Groups channels by generation
  let groups: Generation[] = groupByGeneration(members, []);

  // Handles checkbox change on click
  const handleChange = (isChecked: boolean) => {
    cbVerification(isChecked);
  };

  // Handles form submit
  const handleSubmit = (ev: React.FormEvent) => {
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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-4"
    >
      {/* Checkbox list */}
      <ul className="flex flex-col flex-wrap justify-center gap-y-4">
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
        <Button
          disabled={randomizer < 2 ? true : false}
          className={cn("transition-opacity")}
        >
          <Dices className="mr-2 h-4 w-4" /> Choose a member!
        </Button>
      </div>
    </form>
  );
}

const formatName = (name: string) => name.toLowerCase().split(" ").join("_");

interface FieldsetProps {
  children: React.ReactNode;
  generation: Channel[];
  handleChange: (isChecked: boolean) => void;
}

function GenFieldset({
  children,
  generation,
  handleChange,
}: FieldsetProps) {
  return (
    <fieldset className="flex flex-wrap">
      <legend className="bg-sky-800 px-1.5 py-1 mb-2 font-semibold text-white">
        {children}
      </legend>
      {generation.map((streamer) => (
        <li key={streamer.id} className="mr-5 last:mr-0">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id={formatName(streamer.english_name ?? streamer.name)}
              name={formatName(streamer.english_name ?? streamer.name)}
              defaultChecked={false}
              onCheckedChange={handleChange}
              />
            <Label htmlFor={formatName(streamer.english_name ?? streamer.name)}>{streamer.english_name}</Label>
          </div>
        </li>
      ))}
    </fieldset>
  );
}