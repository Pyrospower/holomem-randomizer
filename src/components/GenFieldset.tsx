import type { Channel } from "src/types";

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
      {generation.map((streamer) => (
        <Checkbox
          name={streamer.english_name ?? streamer.name}
          handleChange={handleChange}
          key={streamer.id}
        />
      ))}
    </fieldset>
  );
}

interface CheckboxProps {
  name: string;
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({ name, handleChange }: CheckboxProps) {
  /*
    when a checkbox is checked:
      set some value to true maybe idk
      maybe send the english name in an array with the full list (not sure but it could be in a context)
    
    when a checkbox is unchecked:
      set the value to false maybe idk
      remove the english name from the array with the full list
  */
  const formattedName = name.toLowerCase().split(" ").join("_");

  return (
    <li className="mr-5 last:mr-0">
      <input
        type="checkbox"
        className="mr-2"
        id={formattedName}
        name={formattedName}
        defaultChecked={false}
        onChange={(ev) => handleChange(ev)}
      />
      <label htmlFor={formattedName}>{name}</label>
    </li>
  );
}
