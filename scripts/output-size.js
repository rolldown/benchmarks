// load using import
import { glob } from "glob";
import * as fs from "fs";
import * as path from "path";

const __dirname = import.meta.dirname;
const apps = fs.readdirSync(path.resolve(__dirname, "../packages"));

let recordMap = {};
const dists = ["rspack-dist", "rollup-dist", "rolldown-dist"];

for (let i = 0; i < apps.length; i++) {
	let app = apps[i];
	let appRecord = {};
	for (let dist of dists) {
		let [bundlerName, _] = dist.split("-");
		let totalSize = 0;
		const jsfiles = await glob(`packages/${app}/${dist}/**/*.js`, {
			ignore: "**/node_modules/**",
		});
		for (let f of jsfiles) {
			totalSize += fs.statSync(f).size;
		}
		appRecord[bundlerName] = totalSize;
	}
	recordMap[app] = appRecord;
}
