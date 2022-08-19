import { Token } from "../src/domains/token";
import { TYPE } from "../src/domains/type";
import { parse } from "../src/parser/parser";

const supportedTags = new Set(["supported"]);
const parseSupportedTags = (tokens: Token[]) => parse(tokens, { parseUnspecifiedTags: false, supportedTags });

const assert = (cond: boolean, msg = "Assertion error") => {
	if (!cond) throw msg;
};
describe("Parser", () => {
	test("Unsupported tag as Text", () => {
		assert(!supportedTags.has("unsupported"));
		const input: Token[] = [
			[TYPE.TAG, "unsupported"],
			[TYPE.WORD, "Bold"],
			[TYPE.TAG, "/unsupported"],
		];
		const ast = parseSupportedTags(input);
		const output = ["[unsupported]Bold[/unsupported]"];
		expect(ast).toEqual(output);
	});

	test("Unclosed supported tag", () => {
		assert(supportedTags.has("supported"));
		const input: Token[] = [
			[TYPE.TAG, "supported"],
			[TYPE.WORD, " text"],
		];
		const ast = parseSupportedTags(input);
		const output = ["[supported] text"];
		expect(ast).toEqual(output);
	});

	test("Mixing supported and unsupported tag", () => {
		assert(supportedTags.has("supported"));
		assert(!supportedTags.has("unsupported"));

		const input: Token[] = [
			[TYPE.TAG, "supported"],
			[TYPE.WORD, "Text with defined tag"],
			[TYPE.TAG, "/supported"],
			[TYPE.TAG, "unsupported"],
			[TYPE.WORD, "Text with unknown tag"],
			[TYPE.TAG, "/unsupported"],
		];
		const ast = parseSupportedTags(input);
		const output = [
			{ tag: "supported", content: "Text with defined tag" },
			"[unsupported]Text with unknown tag[/unsupported]",
		];
		expect(ast).toEqual(output);
	});
});
