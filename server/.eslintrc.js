module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: ["standard"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    describe: "readonly",
    it: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    quotes: [2, "double"],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
      },
    ],
    semi: [2, "always"],
  },
};
