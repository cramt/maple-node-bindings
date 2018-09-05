import * as process from "child_process";
import * as fs from "fs";

const MAPLE_START_MESSAGE = fs.readFileSync("MAPLE_START_MESSAGE").toString();


export class MapleEngine {
    constructor(pathToCMaple: string) {
        let a = process.spawn(pathToCMaple);
        a.stdout.on("data", (data) => {
            console.log(data === MAPLE_START_MESSAGE);
        });
        a.stderr.on("data", console.log)
    }
}