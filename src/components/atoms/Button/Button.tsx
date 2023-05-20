interface ButtonProps {
  children: React.ReactNode;
  visible: boolean;
}

export default function Button({ children, visible }: ButtonProps) {
  return (
    <button
      type="submit"
      className={`cursor-pointer rounded-3xl bg-blue-800 px-6 py-2.5 text-base font-semibold text-white transition duration-200 ease-in-out hover:bg-blue-700 ${
        visible ? "visible opacity-100" : "invisible opacity-0"
      }`}
      name="submit"
    >
      {children}
    </button>
  );
}
