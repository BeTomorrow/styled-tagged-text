import { Node, NodeHelper } from "./node"
export type Ast = Node[];

export const PlantTree = () => {
	const nodeHelper = NodeHelper();
	let tree: Ast = [];
	let currentNode: Node | undefined;
	const pendingIndex: number[] = [];

	function pushNode() {
		if (currentNode !== undefined) {
			if (tree.length > 0 && typeof tree[tree.length - 1] === "string" && typeof currentNode === "string") {
				tree[tree.length - 1] = tree[tree.length - 1] + currentNode;
			} else {
				tree.push(currentNode);
			}
			currentNode = undefined;
		}
	}
	function pushPendingNode() {
		if (currentNode !== undefined) {
			pendingIndex.push(tree.length);
			pushNode()
		}
	}

	function appendWordToCurrentNode(word: string) {
		currentNode = nodeHelper.appendWordNode(currentNode, word)
	}
	function prependWordToLastNode(word: string) {
		if (currentNode) {
			currentNode = nodeHelper.prependWordNode(currentNode, word)
		} else if (tree.length > 0) {
			tree[tree.length - 1] = nodeHelper.appendWordNode(tree[tree.length - 1], word)
		}
	}
	function toTagNode(tag: string) {
		currentNode = nodeHelper.toTagNode(currentNode, tag)
	}

	function hasCurrentNode() { return currentNode !== undefined; }

	function pendingToTagNode(tag: string) {
		const firstPendingIndex = pendingIndex.shift();

		const head = tree.slice(0, firstPendingIndex);
		const tail = tree.slice(firstPendingIndex);
		tree = [...head, nodeHelper.toTagNode(tail, tag)];
	}


	return {
		getTree: () => tree,
		pushNode,
		pushPendingNode,
		appendWordToCurrentNode,
		prependWordToLastNode,
		toTagNode,
		hasCurrentNode,
		pendingToTagNode,
		hasPendingNode: () => pendingIndex.length > 0
	};
};
