import { Token } from "../src/domains/token";
import { TYPE } from "../src/domains/type";
import { parse } from "../src/parser/parser";

const parseAllTags = (tokens: Token[]) => parse(tokens, { parseUnspecifiedTags: true });

describe("Parser", () => {
	test("Text", () => {
		const input: Token[] = [[TYPE.WORD, "text"]];
		const ast = parseAllTags(input);
		const output = ["text"];
		expect(ast).toEqual(output);
	});
	test("Unclosed tag", () => {
		const input: Token[] = [
			[TYPE.TAG, "single"],
			[TYPE.WORD, " text"],
		];
		const ast = parseAllTags(input);
		const output = ["[single] text"];
		expect(ast).toEqual(output);
	});

	test("Enclosing tag", () => {
		const input: Token[] = [
			[TYPE.TAG, "b"],
			[TYPE.WORD, "Bold"],
			[TYPE.TAG, "/b"],
		];
		const ast = parseAllTags(input);
		const output = [{ tag: "b", content: "Bold" }];
		expect(ast).toEqual(output);
	});

	test("Nested Tags", () => {
		const input: Token[] = [
			[TYPE.WORD, "Normal "],
			[TYPE.TAG, "b"],
			[TYPE.WORD, "Bold"],
			[TYPE.TAG, "/b"],
			[TYPE.WORD, " "],
			[TYPE.TAG, "i"],
			[TYPE.TAG, "b"],
			[TYPE.WORD, "Bold Italic"],
			[TYPE.TAG, "/b"],
			[TYPE.WORD, " Italic"],
			[TYPE.TAG, "/i"],
		];
		const ast = parseAllTags(input);
		const output = [
			"Normal ",
			{ tag: "b", content: "Bold" },
			" ",
			{ tag: "i", content: [{ tag: "b", content: "Bold Italic" }, " Italic"] },
		];
		expect(ast).toEqual(output);
	});
});
