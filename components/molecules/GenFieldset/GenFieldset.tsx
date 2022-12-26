import { Channel } from "types";
import { Checkbox } from "../../atoms";

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
      <legend className="bg-sky-800 text-white font-semibold py-1 px-1.5">
        {children}
      </legend>
      {/* One checkbox for each holomem */}
      {generation.map((streamer, index) => (
        <Checkbox {...streamer} handleChange={handleChange} key={index} />
      ))}
    </fieldset>
  );
}
