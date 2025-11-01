import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import {defineConfig} from "eslint/config";

export default defineConfig([
    //Cấu hình cho code Node.js (backend)
    {
        files: ["**/*.{js,mjs,cjs}"],
        ignores: ["node_modules/**"],
        languageOptions: {
            globals: globals.node, //Cho phép dùng require, module, v.v.
            sourceType: "commonjs",
        },
        extends: [js.configs.recommended],
    },

    //Cấu hình cho Vue (frontend)
    {
        files: ["**/*.vue"],
        plugins: {vue: pluginVue},
        ...pluginVue.configs["flat/essential"],
        languageOptions: {
            globals: globals.browser,
        },
    },
]);