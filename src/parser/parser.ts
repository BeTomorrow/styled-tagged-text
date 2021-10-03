/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CLOSE_BRAKET, OPEN_BRAKET, SLASH } from "../domains/char";
import { Token } from "../domains/token";
import { TYPE } from "../domains/type";
import { PlantTree } from "./ast";
import { NodeHelper } from "./node";
import { Stack } from "./stack";
import { TokenCursor } from "./token-cursor";

const isTag = (token: Token) => token[0] === TYPE.TAG;
const isClosingTag = (token: Token) => token[1].charAt(0) === SLASH;
const isOpeningTag = (token: Token) => !isClosingTag(token);
const isWord = (token: Token) => token[0] === TYPE.WORD;

export interface ParserOptions {
	parseUnspecifiedTags?: boolean;
	supportedTags?: Set<string>;
}

export const parse = (tokens: Token[], options?: ParserOptions) => {
	const parseUnspecifiedTags = options?.parseUnspecifiedTags ?? false;
	const supportedTags = options?.supportedTags ?? new Set();

	const treeHelper = PlantTree();

	const tagStack = Stack<Token>();
	let nestedTag: Token[] = [];

	const isClosingTagNested = (tag: string) => {
		const result = nestedTag.filter(t => t[1] === tag.slice(1)).length > 0;
		return result
	}
	const cursor = TokenCursor(tokens);

	const isSupportedTag = (token: Token) => {
		if (parseUnspecifiedTags) return true;
		return supportedTags.has(token[1]);
	};

	const isTagPreviouslyOpened = (token: Token) => {
		const lastOpeningTag = tagStack.peek();
		if (!lastOpeningTag) {
			return false;
		}
		return lastOpeningTag[1] === token[1].slice(1);
	};

	const processToken = () => {
		const token = cursor.getCurrent();
		if (isWord(token)) {
			treeHelper.appendWordToCurrentNode(token[1])
			cursor.skip();
			return;
		}
		if (isTag(token)) {
			if (isOpeningTag(token)) {
				if (!isSupportedTag(token)) {
					treeHelper.appendWordToCurrentNode(OPEN_BRAKET + token[1] + CLOSE_BRAKET)
					cursor.skip();
					return;
				}
				if (treeHelper.hasCurrentNode()) {
					if (!tagStack.isEmpty()) {
						nestedTag = tagStack.getCopy();
						treeHelper.pushPendingNode()
					} else { treeHelper.pushNode() }
				}
				tagStack.push(token);
				cursor.skip();
				return;
			}
			if (isClosingTag(token)) {
				if (isTagPreviouslyOpened(token)) {
					if (isClosingTagNested(token[1])) {
						treeHelper.pushNode();
						treeHelper.pendingToTagNode(tagStack.pop()![1])
					} else {
						treeHelper.toTagNode(tagStack.pop()![1]);
					}
					if (tagStack.isEmpty()) {
						treeHelper.pushNode();
					}
					cursor.skip();
					return;
				} else {
					treeHelper.appendWordToCurrentNode(OPEN_BRAKET + token[1] + CLOSE_BRAKET);
					cursor.skip();
					return;
				}
			}
		}
	};

	while (cursor.hasNext()) {
		processToken();
	}

	while (!tagStack.isEmpty()) {
		treeHelper.prependWordToLastNode(OPEN_BRAKET + tagStack.pop()![1] + CLOSE_BRAKET);
	}
	treeHelper.pushNode();

	return treeHelper.getTree();
};
