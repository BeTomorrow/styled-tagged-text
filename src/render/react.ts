import React, { ReactNode, useMemo } from "react";
import { createLexer } from "../lexer/lexer";
import { Ast, Node } from "../parser/ast";
import { parse, ParserOptions } from "../parser/parser";

const toAst = (input: string, options: ParserOptions) => parse(createLexer(input).tokenize(), options);

export function renderReactElements(
	elementToRender: any,
	props: any,
	inputText: string | undefined,
	tagsStyle: Record<string, any>,
	removeUnknownTags = false
) {
	const ast = useMemo(
		() =>
			toAst(inputText || "", {
				parseUnspecifiedTags: removeUnknownTags,
				supportedTags: new Set(Object.keys(tagsStyle)),
			}),
		[inputText, tagsStyle]
	);

	function getTagStyle(tag: string) {
		return tagsStyle[tag] || {};
	}
	function render(ast: Ast) {
		return ast.map((node, index) => renderNode(node, `inline-styled-${index.toString()}`));
	}

	function renderNode(node: Node | undefined, key?: string): ReactNode | JSX.Element {
		if (node === undefined) {
			return undefined;
		}
		if (typeof node === "string") {
			return node;
		} else if (typeof node === "object") {
			if (Array.isArray(node)) {
				return node.map((node, index) => renderNode(node, `inline-styled-${index.toString()}`));
			} else {
				return React.createElement(elementToRender, { style: getTagStyle(node.tag), key }, renderNode(node.content));
			}
		}
		return undefined;
	}

	return React.createElement(elementToRender, props, render(ast));
}
