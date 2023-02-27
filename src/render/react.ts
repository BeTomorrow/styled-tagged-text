/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";
import React from "react";
import { toAst } from "../ast";

export function renderReactElements(
	elementToRender: any,
	props: any,
	inputText: string | undefined,
	tagsStyle: Record<string, any>,
) {
	const ast = toAst(inputText ?? "");

	function getTagStyle(tag: string) {
		return tagsStyle[tag] || {};
	}
	function render(ast: ReturnType<typeof toAst>) {
		return ast.map((node, index) => renderNode(node, `inline-styled-${index.toString()}`));
	}

	function renderNode(node: ReturnType<typeof toAst>[0] | undefined, key?: string): ReactNode | JSX.Element {
		if (node === undefined) {
			return undefined;
		}
		if (node.type === "ELEMENT") {
			return React.createElement(
				elementToRender,
				{ style: getTagStyle(node.name), key },
				node.children.map((innerNode, index) => renderNode(innerNode, `inline-styled-${index.toString()}`)),
			);
		}
		return node.value;
	}

	return React.createElement(elementToRender, props, render(ast));
}
