/* eslint-disable no-mixed-spaces-and-tabs */
export type Token = {
	type: "TAG_OPEN" | "TAG_CLOSE" | "TEXT";
	value: string;
};

export type NodeTree =
	| {
			type: "ELEMENT";
			name: string;
			children: NodeTree[];
	  }
	| {
			type: "TEXT";
			value: string;
	  };
