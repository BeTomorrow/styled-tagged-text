import { Token } from "../domains/token";

export function TokenCursor(source: Token[]) {
	const cursor = {
		pos: 0,
		len: source.length,
	};
	const skip = (i = 1) => {
		cursor.pos += i;
	};
	const hasNext = () => cursor.len > cursor.pos;

	const getCurrent = () => source[cursor.pos];

	const getNext = () => source[cursor.pos + 1];

	const shift = () => source[++cursor.pos];

	return { skip, hasNext, getCurrent, getNext, shift };
}
