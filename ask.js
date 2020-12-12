const rl = require("readline");
module.exports = (question) => {
	const interface = rl.createInterface({
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