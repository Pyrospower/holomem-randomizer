interface ButtonProps {
  children: React.ReactNode;
  visible: boolean;
}

export default function Button({ children, visible }: ButtonProps) {
  return (
    <button
      type="submit"
      className={`transition ease-in-out duration-200 bg-blue-800 hover:bg-blue-700 text-white text-base font-semibold py-2.5 px-6 rounded-3xl cursor-pointer ${
        visible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      name="submit"
      onClick={() => console.log("Submit button clicked")}
    >
      {children}
    </button>
  );
}
