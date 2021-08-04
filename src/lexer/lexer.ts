import { CLOSE_BRAKET, OPEN_BRAKET } from "../domains/char";
import { Token } from "../domains/token";
import { TYPE } from "../domains/type";
import { StringCursor } from "./string-cursor";

export function createLexer(input: string) {
	const tokens: Token[] = [];
	const cursor = StringCursor(input);

	const emitToken = (type: number, value: string) => tokens.push([type, value]);

	function buildToken() {
		if (cursor.getCurrent() === OPEN_BRAKET) {
			const substr = cursor.substrUntilChar(CLOSE_BRAKET);
			// Cases "[Hello" and "[Hello [tag][/tag]"
			const isInvalidTag = substr.length === 0 || substr.indexOf(OPEN_BRAKET, 1) >= 0;

			if (isInvalidTag) {
				const word = cursor.grabUntil(c => c === OPEN_BRAKET);
				emitToken(TYPE.WORD, word);
				cursor.skip();
				return;
			}
			cursor.skip(); // skip "["
			const tagName = cursor.grabUntil(c => c === CLOSE_BRAKET);
			emitToken(TYPE.TAG, tagName);
			cursor.skip(); // skip "]"
			return;
		}
		const word = cursor.grabUntil(c => c === OPEN_BRAKET);
		emitToken(TYPE.WORD, word);
		return;
	}
	function tokenize(): Token[] {
		while (cursor.hasNext()) {
			buildToken();
		}
		return tokens;
	}
	return { tokenize };
}
