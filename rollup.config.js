import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import sourceMaps from "rollup-plugin-sourcemaps";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript";
import pkg from "./package.json";

const cjsConfig = {
	exports: "named",
	format: "cjs",
	sourcemap: true,
};

const esmConfig = {
	format: "esm",
	sourcemap: true,
};

// this should always be last
const minifierPlugin = terser({
	compress: {
		passes: 2,
	},
});

const commonPlugins = [
	resolve(), // so Rollup can find styled-tagged-text
	commonjs(), // so Rollup can convert styled-tagged-text to an ES module
	typescript(), // so Rollup can convert TypeScript to JavaScript
	sourceMaps(), // so Rollup can build sourcemaps
	minifierPlugin, // so Rollup can minify js
];

const configBase = {
	input: "./src/index.ts",
	plugins: commonPlugins,
	external: ["react"],
};

export default [
	// Web
	{
		...configBase,
		output: [
			{ file: pkg.main, ...cjsConfig },
			{ file: pkg.module, ...esmConfig },
		],
	},
	// React-Native
	{
		...configBase,
		input: "./src/native/index.ts",
		output: [
			{ file: "native/dist/styled-tagged-text.native.cjs.js", ...cjsConfig },
			{ file: "native/dist/styled-tagged-text.native.esm.js", ...esmConfig },
		],
	},
];
