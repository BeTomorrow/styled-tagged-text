import { Token } from "./type";

interface OpenTag {
	name: string;
	position: number;
}
export function lexer(input: string) {
	const openTagsStack: OpenTag[] = [];

	const result: Token[] = [];

	let currentToken = "";
	let inTag = false;
	for (const char of input) {
		if (char === "[") {
			if (currentToken) {
				result.push({
					type: "TEXT",
					value: currentToken,
				});
				currentToken = "";
			}
			inTag = true;
		} else if (char === "]") {
			if (inTag) {
				// Check if the current token is a closing tag
				if (currentToken[0] === "/") {
					const name = currentToken.slice(1);
					const openTag = openTagsStack.pop();

					// If the open and closing tags do not match, treat the closing tag as text
					if (openTag?.name !== name) {
						result.push({
							type: "TEXT",
							value: `[${currentToken}]`,
						});
						if (openTag !== undefined) {
							openTagsStack.push(openTag);
						}
					} else {
						result.push({
							type: "TAG_CLOSE",
							value: name,
						});
					}
				} else {
					openTagsStack.push({ name: currentToken, position: result.length });
					result.push({
						type: "TAG_OPEN",
						value: currentToken,
					});
				}
				currentToken = "";
				inTag = false;
				// If we are not inside a tag, add the closing bracket to the current token
			} else {
				currentToken += char;
			}
		} else {
			currentToken += char;
		}
	}

	if (currentToken) {
		result.push({
			type: "TEXT",
			value: (inTag ? "[" : "") + currentToken,
		});
	}

	// Transform remaining open tags to text tokens
	while (openTagsStack.length) {
		const openTag = openTagsStack.pop() as OpenTag;
		result[openTag.position] = {
			type: "TEXT",
			value: `[${openTag.name}]`,
		};
	}

	return result;
}
