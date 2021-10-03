export function Stack<T>() {
	const stack: T[] = [];
	const peek = () => (stack.length > 0 ? stack[stack.length - 1] : undefined);
	const isEmpty = () => !stack.length;
	const hasOneElement = () => stack.length === 1;
	return { push: (e: T) => stack.push(e), pop: () => stack.pop(), peek, isEmpty, hasOneElement, length: stack.length, getCopy: () => [...stack] };
}
