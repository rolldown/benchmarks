// load using import
import { glob } from "glob";
import * as fs from "fs";
import * as path from "path";

const apps = fs.readdirSync(path.resolve(import.meta.dirname, "../apps"));

let recordMap = {};
const dists = ["rspack-dist", "rollup-dist", "rolldown-dist", "esbuild-dist"];

for (let i = 0; i < apps.length; i++) {
	let app = apps[i];
	let appRecord = {};
	for (let dist of dists) {
		let [bundlerName, _] = dist.split("-");
		let totalSize = 0;
		const jsfiles = await glob(`apps/${app}/${dist}/**/*.js`, {
			ignore: "**/node_modules/**",
		});
		for (let f of jsfiles) {
			totalSize += (fs.statSync(f).size / 1024);
		}
		appRecord[bundlerName] = totalSize.toFixed(2);
	}
	recordMap[app] = appRecord;
}
console.log(`recordMap: `, recordMap)
