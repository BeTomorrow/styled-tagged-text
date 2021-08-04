module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	extends: [
		"@react-native-community",
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	rules: {
		quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: false }],
		"react-native/no-unused-styles": 2,
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-empty-interface": "off",
		"react/self-closing-comp": "off",
		"no-shadow": "off",
		"no-mixed-spaces-and-tabs": "off",
		curly: "off",
	},
};
