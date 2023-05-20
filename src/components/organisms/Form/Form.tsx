"use client";
import { useRef, useState } from "react";
import { GenFieldset } from "@/components/molecules";
import { Button } from "@/components/atoms";
import { Channel, Generation } from "src/types";
import { groupByGeneration } from "src/utils/sorting";

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
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = ev.target.checked;

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
      <ul className="flex flex-col flex-wrap justify-center gap-y-2">
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
  );
}
