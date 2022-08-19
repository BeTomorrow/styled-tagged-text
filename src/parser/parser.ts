/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CLOSE_BRAKET, OPEN_BRAKET, SLASH } from "../domains/char";
import { Token } from "../domains/token";
import { TYPE } from "../domains/type";

const isTag = (token: Token) => token[0] === TYPE.TAG;
const isClosingTag = (token: Token) => token[1].charAt(0) === SLASH;
const isOpeningTag = (token: Token) => !isClosingTag(token);
const isWord = (token: Token) => token[0] === TYPE.WORD;

export interface ParserOptions {
	parseUnspecifiedTags?: boolean;
	supportedTags?: Set<string>;
}

type Node = (LeafNode | TagNode)[];

interface TagNode {
	tag: string;
	content: Node | undefined;
}

export type LeafNode = string;
export const parse = (tokens: Token[], options?: ParserOptions) => {
	const parseUnspecifiedTags = options?.parseUnspecifiedTags ?? false;
	const supportedTags = options?.supportedTags ?? new Set();

	const isSupportedTag = (token: Token) => {
		if (parseUnspecifiedTags) return true;
		return supportedTags.has(token[1]);
	};

	function processToken(tokens: Token[]): Node {
		if (tokens.length === 0) {
			return [];
		}
		const currentToken = tokens[0];
		if (isWord(currentToken)) {
			return concat(currentToken[1], processToken(tokens.slice(1)));
		}
		if (isTag(currentToken)) {
			if (!isSupportedTag(currentToken)) {
				return concat(OPEN_BRAKET + currentToken[1] + CLOSE_BRAKET, processToken(tokens.slice(1)));
			}
			if (isOpeningTag(currentToken)) {
				const [enclosedTokens, remainingTokens] = grabTokensUntil(tokens.slice(1), (t: Token) =>
					isClosingTagMatchingOpeningTag(t, currentToken),
				);
				if (enclosedTokens.length > 0) {
					return concat({ tag: currentToken[1], content: processToken(enclosedTokens) }, processToken(remainingTokens));
				} else {
					return concat(OPEN_BRAKET + currentToken[1] + CLOSE_BRAKET, processToken(tokens.slice(1)));
				}
			}
			if (isClosingTag(currentToken)) {
				return concat(OPEN_BRAKET + currentToken[1] + CLOSE_BRAKET, processToken(tokens.slice(1)));
			}
		}
		return [];
	}

	const result = processToken(tokens);
	return Array.isArray(result) ? result : [result];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function concat(a: any, b: any): any {
	if (Array.isArray(b) && b.length === 0) {
		return a;
	}
	if (typeof a === "string" && typeof b === "string") {
		return a + b;
	}
	if (typeof a === "string" && Array.isArray(b) && b.length > 0 && typeof b[0] === "string") {
		b[0] = a + b[0];
		return b;
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		return a.concat(b);
	}
	if (Array.isArray(a)) {
		return [...a, b];
	}
	if (Array.isArray(b)) {
		return [a, ...b];
	}
	return [a, b];
}

function isClosingTagMatchingOpeningTag(closingTag: Token, openingTag: Token) {
	return isClosingTag(closingTag) && closingTag[1].slice(1) === openingTag[1];
}

function grabTokensUntil(tokens: Token[], predicate: (t: Token) => boolean): [Token[], Token[]] {
	const index = tokens.findIndex(predicate);
	if (index === -1 || index === 0) {
		return [[], tokens];
	}
	// remove tag which match predicate
	return [tokens.slice(0, index), tokens.slice(index + 1)];
}
