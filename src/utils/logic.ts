export const functionToHeader = (functions: string): string[] => {
	const headers: string[] = []
	
	const size = functions.length;

	let trav = 0;

	console.log(headers);
	while (trav < size) {
		let temp: string = '';

		while (trav < size && functions[trav] != '{') {
			console.log("meow");
			temp += functions[trav++];
		}

		const colStack: string[] = ['{']
		trav++;

		while (trav < size && colStack.length > 0) {
			if (functions[trav] == '{') {
				colStack.push('{');
			}
			else if (functions[trav] == '}') {
				colStack.pop();
			}

			trav++;
		}

		console.log(functions[trav]);
		console.log(colStack)

		if (colStack.length == 0) {
			headers.push(temp.trim() + ';');
		}
	}

	return headers;
}