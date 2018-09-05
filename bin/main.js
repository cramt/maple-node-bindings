"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var process = __importStar(require("child_process"));
var fs = __importStar(require("fs"));
var MAPLE_START_MESSAGE = fs.readFileSync("MAPLE_START_MESSAGE").toString();
var MapleEngine = /** @class */ (function () {
    function MapleEngine(pathToCMaple) {
        var a = process.spawn(pathToCMaple);
        a.stdout.on("data", function (data) {
            console.log(data === MAPLE_START_MESSAGE);
        });
        a.stderr.on("data", console.log);
    }
    return MapleEngine;
}());
exports.MapleEngine = MapleEngine;
