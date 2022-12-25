export default function Button({ children }) {
  return (
    <button
      type="submit"
      className="transition ease-in-out duration-200 bg-blue-800 hover:bg-blue-700 text-white text-base font-semibold py-2.5 px-6 rounded-3xl cursor-pointer"
      name="submit"
      onClick={() => console.log("Submit button clicked")}
    >
      {children}
    </button>
  );
}
