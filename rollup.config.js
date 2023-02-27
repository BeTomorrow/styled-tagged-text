import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

// this should always be last
const minifierPlugin = terser({
	compress: {
		passes: 2,
	},
	format: {
		comments: false,
	},
});

const commonPlugins = [
	nodeResolve(), // resolve node-modules
	commonjs(), // convert to an ES module
	typescript(), // build type declaration file
	minifierPlugin, // minify js
];

const configBase = {
	input: "./src/index.ts",
	plugins: commonPlugins,
	external: ["react", "react-native"],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const benchmark = {
	input: "./benchmark/benchmark.ts",
	plugins: commonPlugins,
};
const cjsConfig = {
	exports: "named",
	format: "cjs",
	sourcemap: true,
};

const esmConfig = {
	format: "esm",
	sourcemap: true,
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
];
