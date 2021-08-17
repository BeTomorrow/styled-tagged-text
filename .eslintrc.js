module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint"],
	ignorePatterns: ["react.d.ts"],
	rules: {
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"arrow-parens": 0,
	},
};
