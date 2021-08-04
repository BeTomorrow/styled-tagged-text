import { TYPE } from "../src/domains/type";
import { createLexer } from "../src/lexer/lexer";

const toTokens = (input: string) => createLexer(input).tokenize();

describe("lexer", () => {
	test("Text", () => {
		const input = "text";
		const tokens = toTokens(input);
		const output = [[TYPE.WORD, "text"]];
		expect(tokens).toEqual(output);
	});
	test("Unclosed tag", () => {
		const input = "[single] text";
		const tokens = toTokens(input);
		const output = [
			[TYPE.TAG, "single"],
			[TYPE.WORD, " text"],
		];
		expect(tokens).toEqual(output);
	});

	test("Enclosing tag", () => {
		const input = "[b]Bold[/b]";
		const tokens = toTokens(input);
		const output = [
			[TYPE.TAG, "b"],
			[TYPE.WORD, "Bold"],
			[TYPE.TAG, "/b"],
		];
		expect(tokens).toEqual(output);
	});

	test("Nested Tags", () => {
		const input = "Normal [b]Bold[/b] [i][b]Bold Italic[/b] Italic[/i]";
		const tokens = toTokens(input);
		const output = [
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
		expect(tokens).toEqual(output);
	});
});
