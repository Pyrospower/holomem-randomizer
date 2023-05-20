import type { Channel } from "src/types";
import { Checkbox } from "@/components/atoms";

interface FieldsetProps {
  children: React.ReactNode;
  generation: Channel[];
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function GenFieldset({
  children,
  generation,
  handleChange,
}: FieldsetProps) {
  return (
    <fieldset className="flex flex-wrap">
      <legend className="bg-sky-800 px-1.5 py-1 font-semibold text-white">
        {children}
      </legend>
      {/* One checkbox for each holomem */}
      {generation.map((streamer, index) => (
        <Checkbox
          name={streamer.english_name ?? streamer.name}
          handleChange={handleChange}
          key={index}
        />
      ))}
    </fieldset>
  );
}
