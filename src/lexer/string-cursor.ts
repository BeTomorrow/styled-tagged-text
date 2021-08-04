export function StringCursor(source: string) {
	const cursor = {
		pos: 0,
		len: source.length,
	};
	const skip = (i = 1) => {
		cursor.pos += i;
	};
	const hasNext = () => cursor.len > cursor.pos;

	const getCurrent = () => source[cursor.pos];

	const grabUntil = (cond: (char: string) => boolean) => {
		let start = 0;
		if (hasNext()) {
			start = cursor.pos;
			while (hasNext() && !cond(getCurrent())) {
				skip();
			}
		}
		return source.substr(start, cursor.pos - start);
	};
	const substrUntilChar = (char: string) => {
		const { pos } = cursor;
		const index = source.indexOf(char, pos);
		return index >= 0 ? source.substr(pos, index - pos) : "";
	};

	return { skip, hasNext, getCurrent, grabUntil, substrUntilChar };
}
