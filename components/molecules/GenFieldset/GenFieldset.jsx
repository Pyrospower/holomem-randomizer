import { Checkbox } from "../../atoms";

export default function GenFieldset({ children, generation, handleChange }) {
  return (
    <fieldset className="flex">
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
