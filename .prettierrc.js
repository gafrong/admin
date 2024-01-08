module.exports = {
  semi: false,
  singleQuote: true,
  plugins: [
    require.resolve('@ianvs/prettier-plugin-sort-imports'),
    'prettier-plugin-tailwindcss',
  ],
}
