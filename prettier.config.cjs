/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
};

module.exports = config;
