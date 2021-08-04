export type Ast = Node[];
export type Node = LeafNode | TagNode | (LeafNode | TagNode)[];

export interface TagNode {
	tag: string;
	content: Node | undefined;
}

export type LeafNode = string;

export const PlantTree = () => {
	const tree: Ast = [];

	let currentNode: Node | undefined;

	const toTagNode = (tag: string) => {
		currentNode = { tag, content: currentNode };
	};

	const toWordNode = (word: string) => {
		if (currentNode === undefined) {
			currentNode = word;
		} else {
			appendWordNode(word);
		}
	};

	const pushCurrentNode = () => {
		const previousNode = tree[tree.length - 1];
		if (currentNode) {
			if (typeof previousNode === "string" && typeof currentNode === "string") {
				tree[tree.length - 1] = previousNode + currentNode;
			} else {
				tree.push(currentNode);
			}
			currentNode = undefined;
		}
	};

	const appendWordNode = (word: string) => {
		if (typeof currentNode === "string") {
			currentNode = currentNode + word;
		} else if (typeof currentNode === "object") {
			if (Array.isArray(currentNode)) {
				currentNode.push(word);
			} else {
				currentNode = [currentNode, word];
			}
		} else {
			toWordNode(word);
		}
	};

	const prependWordNode = (word: string) => {
		if (typeof currentNode === "string") {
			currentNode = word + currentNode;
		} else if (typeof currentNode === "object") {
			if (Array.isArray(currentNode)) {
				currentNode = [word, ...currentNode];
			} else {
				currentNode = [word, currentNode];
			}
		} else {
			toWordNode(word);
		}
	};

	return { tree, toTagNode, toWordNode, pushCurrentNode, appendWordNode, prependWordNode };
};
