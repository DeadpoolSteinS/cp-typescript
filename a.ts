function isBalanced(s: string): boolean {
	const stack: string[] = [];
	for (const c of s) {
		if (c === "(" || c === "{" || c === "[") {
			stack.push(c);
		} else {
			if (
				stack.length === 0 ||
				(c === ")" && stack.pop() !== "(") ||
				(c === "}" && stack.pop() !== "{") ||
				(c === "]" && stack.pop() !== "[")
			) {
				return false;
			}
		}
	}
	return stack.length === 0;
}

console.log(isBalanced("{[()]}") ? "Seimbang" : "Tidak Seimbang");