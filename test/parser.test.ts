import { parser } from "../src/parser";
import { Token } from "../src/type";
describe("Parser", () => {
	test("Text", () => {
		const input: Token[] = [{ type: "TEXT", value: "text" }];
		const ast = [...parser(input)];
		const output = [{ type: "TEXT", value: "text" }];
		expect(ast).toEqual(output);
	});
	test("Unclosed tag", () => {
		const input: Token[] = [
			{ type: "TEXT", value: "[single]" },
			{ type: "TEXT", value: " text" },
		];
		const ast = [...parser(input)];
		const output = [
			{ type: "TEXT", value: "[single]" },
			{ type: "TEXT", value: " text" },
		];
		expect(ast).toEqual(output);
	});

	test("Enclosing tag", () => {
		const input: Token[] = [
			{ type: "TAG_OPEN", value: "b" },
			{ type: "TEXT", value: "Bold" },
			{ type: "TAG_CLOSE", value: "b" },
		];
		const ast = [...parser(input)];
		const output = [{ type: "ELEMENT", name: "b", children: [{ type: "TEXT", value: "Bold" }] }];
		expect(ast).toEqual(output);
	});

	test("Nested Tags", () => {
		const input: Token[] = [
			{ type: "TEXT", value: "Normal " },
			{ type: "TAG_OPEN", value: "b" },
			{ type: "TEXT", value: "Bold" },
			{ type: "TAG_CLOSE", value: "b" },
			{ type: "TEXT", value: " " },
			{ type: "TAG_OPEN", value: "i" },
			{ type: "TAG_OPEN", value: "b" },
			{ type: "TEXT", value: "Bold Italic" },
			{ type: "TAG_CLOSE", value: "b" },
			{ type: "TEXT", value: " Italic" },
			{ type: "TAG_CLOSE", value: "i" },
		];
		const ast = [...parser(input)];
		const output = [
			{ type: "TEXT", value: "Normal " },
			{ type: "ELEMENT", name: "b", children: [{ type: "TEXT", value: "Bold" }] },
			{ type: "TEXT", value: " " },
			{
				type: "ELEMENT",
				name: "i",
				children: [
					{ type: "ELEMENT", name: "b", children: [{ type: "TEXT", value: "Bold Italic" }] },
					{ type: "TEXT", value: " Italic" },
				],
			},
		];
		expect(ast).toEqual(output);
	});
});
