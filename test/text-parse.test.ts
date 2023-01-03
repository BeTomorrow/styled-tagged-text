import { toAst } from "../src/ast";

describe("Inline styled text parse test", () => {
	test("Nested Tags", () => {
		const input = "Normal [b]Bold[/b] [i][b]Bold Italic[/b] Italic[/i]";
		const ast = toAst(input);
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

	test("Begin with unclosed Tag", () => {
		const input = "[b]Normal Bold";
		const ast = toAst(input);
		const output = [
			{ type: "TEXT", value: "[b]" },
			{ type: "TEXT", value: "Normal Bold" },
		];
		expect(ast).toEqual(output);
	});

	test("Ending with unclosed Tag", () => {
		const input = "Normal Bold[b]";
		const ast = toAst(input);
		const output = [
			{ type: "TEXT", value: "Normal Bold" },
			{ type: "TEXT", value: "[b]" },
		];
		expect(ast).toEqual(output);
	});

	test("unclosed Tag", () => {
		const input = "Normal [b]Bold";
		const ast = toAst(input);
		const output = [
			{ type: "TEXT", value: "Normal " },
			{ type: "TEXT", value: "[b]" },
			{ type: "TEXT", value: "Bold" },
		];
		expect(ast).toEqual(output);
	});

	test("Not opened Tag", () => {
		const input = "Foo[/b], [emph]Emphasize[/emph][/bar]";
		const ast = toAst(input);
		const output = [
			{ type: "TEXT", value: "Foo" },
			{ type: "TEXT", value: "[/b]" },
			{ type: "TEXT", value: ", " },
			{ type: "ELEMENT", name: "emph", children: [{ type: "TEXT", value: "Emphasize" }] },
			{ type: "TEXT", value: "[/bar]" },
		];
		expect(ast).toEqual(output);
	});

	test("Begin with closing Tag", () => {
		const input = "[/b]Normal Bold";
		const ast = toAst(input);
		const output = [
			{ type: "TEXT", value: "[/b]" },
			{ type: "TEXT", value: "Normal Bold" },
		];
		expect(ast).toEqual(output);
	});

	test("Ending with single closing Tag", () => {
		const input = "Normal Bold[/b]";
		const ast = toAst(input);
		const output = [
			{ type: "TEXT", value: "Normal Bold" },
			{ type: "TEXT", value: "[/b]" },
		];
		expect(ast).toEqual(output);
	});

	test("single closing Tag", () => {
		const input = "Normal [/b]Bold";
		const ast = toAst(input);
		const output = [
			{ type: "TEXT", value: "Normal " },
			{ type: "TEXT", value: "[/b]" },
			{ type: "TEXT", value: "Bold" },
		];
		expect(ast).toEqual(output);
	});

	test("Starting with multiple tags", () => {
		const input = "[c][b]Foo [a]Bar[/a][/b][/c]";
		const ast = toAst(input);
		const output = [
			{
				type: "ELEMENT",
				name: "c",
				children: [
					{
						type: "ELEMENT",
						name: "b",
						children: [
							{ type: "TEXT", value: "Foo " },
							{ type: "ELEMENT", name: "a", children: [{ type: "TEXT", value: "Bar" }] },
						],
					},
				],
			},
		];
		expect(ast).toEqual(output);
	});

	test("Complex nested tag", () => {
		const input = "[b]Foo [a]Bar[/a] [c][a]Baz[/a][/c][/b]";
		const ast = toAst(input);
		const output = [
			{
				type: "ELEMENT",
				name: "b",
				children: [
					{ type: "TEXT", value: "Foo " },
					{ type: "ELEMENT", name: "a", children: [{ type: "TEXT", value: "Bar" }] },
					{ type: "TEXT", value: " " },
					{
						type: "ELEMENT",
						name: "c",
						children: [{ type: "ELEMENT", name: "a", children: [{ type: "TEXT", value: "Baz" }] }],
					},
				],
			},
		];
		expect(ast).toEqual(output);
	});
});
