export type Ast = Node[];
export type Node = LeafNode | TagNode | PendingNode | (LeafNode | TagNode | PendingNode)[];

export interface PendingNode { }
export interface TagNode {
    tag: string;
    content: Node | undefined;
}

export type LeafNode = string;

function toTagNode(node: Node | undefined, tag: string): Node {
    return ({ tag, content: node });
};

function appendWordNode(node: Node | undefined, word: string): Node {
    if (typeof node === "string") {
        return node + word;
    } else if (typeof node === "object") {
        if (Array.isArray(node)) {
            node.push(word);
            return node;
        } else {
            return [node, word];
        }
    } else {
        return word
    }
};

function prependWordNode(node: Node | undefined, word: string): Node {
    if (typeof node === "string") {
        return word + node;
    } else if (typeof node === "object") {
        if (Array.isArray(node)) {
            return [word, ...node];
        } else {
            return [word, node];
        }
    } else {
        return word
    }
};

export const NodeHelper = () => ({ toTagNode, appendWordNode, prependWordNode })