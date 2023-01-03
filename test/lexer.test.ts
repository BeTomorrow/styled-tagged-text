import { lexer } from "../src/lexer";
describe("lexer", () => {
	describe("lexer", () => {
		test("Text", () => {
			const input = "text";
			const tokens = lexer(input);
			const output = [{ type: "TEXT", value: "text" }];
			expect(tokens).toEqual(output);
		});
		test("Unclosed tag", () => {
			const input = "[single] text";
			const tokens = lexer(input);
			const output = [
				{ type: "TEXT", value: "[single]" },
				{ type: "TEXT", value: " text" },
			];
			expect(tokens).toEqual(output);
		});

		test("Enclosing tag", () => {
			const input = "[b]Bold[/b]";
			const tokens = lexer(input);
			const output = [
				{ type: "TAG_OPEN", value: "b" },
				{ type: "TEXT", value: "Bold" },
				{ type: "TAG_CLOSE", value: "b" },
			];
			expect(tokens).toEqual(output);
		});

		test("Nested Tags", () => {
			const input = "Normal [b]Bold[/b] [i][b]Bold Italic[/b] Italic[/i]";
			const tokens = lexer(input);
			const output = [
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
			expect(tokens).toEqual(output);
		});
	});
});
