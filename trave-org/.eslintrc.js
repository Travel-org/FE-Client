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
    rules: {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "react/function-component-definition": [2, { "namedComponents": "arrow-function" }],
        "object-shorthand": ["error", "never"],
        "no-param-reassign": "off"
    }
}