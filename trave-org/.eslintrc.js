module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        "airbnb",
        "airbnb-typescript",
        "plugin:prettier/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        sourceType: "module",
        project: "./tsconfig.json"
    },
    plugins: [
        "@emotion"
      ],
    rules: {
        "@typescript-eslint/no-unused-vars": "warn",
        "@emotion/jsx-import": "error"
    }
}