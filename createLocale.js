const awaitResponse = require("./ask");
const fs = require("fs");
const path = require("path");

(async () => {
	let locale = process.argv[2];
	while (true) {
		if (locale) break;
		locale = await awaitResponse("Write a name of a new locale: ");
		if (!locale.length) continue;
		else break;
	}
	console.log("Getting list of languages");
	const languages = fs.readdirSync(__dirname).filter(x => !x.startsWith(".") && fs.statSync(path.join(__dirname, x)).isDirectory());
	if (!languages.length) return console.log("No languages folders found");
	console.log("List of languages (%d): %s. Creating %s.json file in these folders", languages.length, languages.join(", "), locale);
	for (let i = 0; i < languages.length; i++) {
		const filepath = path.join(__dirname, languages[i], locale + ".json");
		if (fs.existsSync(filepath)) {
			console.log("[%s] %s locale is already exists, skipping", languages[i], locale);
			continue;
		}
		fs.writeFileSync(filepath, "{}");
		console.log("[%s] ✔", languages[i]);
	}
	console.log("Done");
})();