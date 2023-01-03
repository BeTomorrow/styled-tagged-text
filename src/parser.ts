import { NodeTree, Token } from "./type";

type ElementNode = {
	type: "ELEMENT";
	name: string;
	children: NodeTree[];
};
export const parser = function* (input: Token[]): Generator<NodeTree> {
	const stack: ElementNode[] = [];
	for (const token of input) {
		if (token.type === "TAG_OPEN") {
			const element: NodeTree = { type: "ELEMENT", name: token.value, children: [] };
			if (stack.length > 0) {
				const parent = stack[stack.length - 1];
				parent.children.push(element);
			}
			stack.push(element);
			continue;
		}
		if (token.type === "TAG_CLOSE") {
			if (stack.length === 0) {
				console.error(new TypeError("Unexpected close tag"));
			}
			const element = stack.pop() as ElementNode;
			if (element.name !== token.value) {
				console.error(new TypeError(`Expected closing tag for "${element.name}"`));
			}
			if (stack.length === 0) {
				yield element;
			}
			continue;
		}
		if (token.type === "TEXT") {
			if (stack.length === 0) {
				yield { type: "TEXT", value: token.value };
			} else {
				const parent = stack[stack.length - 1];
				parent.children.push({ type: "TEXT", value: token.value });
			}
		}
	}
	if (stack.length > 0) {
		console.error(new TypeError(`Expected closing tag for ${stack[stack.length - 1].name}`));
	}
};
