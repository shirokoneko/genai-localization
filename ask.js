const readline = require("readline");
module.exports = (question) => {
	const interface = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	return new Promise((r) => {
		interface.question(question, (q) => {
			interface.close();
			return r(q);
		});
	});
}