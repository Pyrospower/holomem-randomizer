import type { Channel } from "src/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FieldsetProps {
  children: React.ReactNode;
  generation: Channel[];
  handleChange: (isChecked: boolean) => void;
}

const formatName = (name: string) => name.toLowerCase().split(" ").join("_");

export default function GenFieldset({
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
