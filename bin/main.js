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
var MAPLE_START_MESSAGE = "    |\\^/|     Maple 2018 (IBM INTEL NT)\r\n._|\\|   |/|_. Copyright (c) Maplesoft, a division of Waterloo Maple Inc. 2018\r\n \\  MAPLE  /  All rights reserved. Maple is a trademark of\r\n <____ ____>  Waterloo Maple Inc.\r\n      |       Type ? for help.\r\n";
var MapleEngine = /** @class */ (function () {
    function MapleEngine(pathToCMaple) {
        var _this = this;
        this.mapleProcess = process.spawn(pathToCMaple);
        this.mapleProcess.stdout.on("data", function (data) {
            if (data.toString() === MAPLE_START_MESSAGE) {
                _this.mapleProcess.send("D(x->x^sin(x))");
            }
            console.log(data.toString());
        });
        this.mapleProcess.stderr.on("data", console.log);
        this.mapleProcess.on("close", function (code, signal) {
            console.log("maple process closed with code " + code);
        });
    }
    return MapleEngine;
}());
exports.MapleEngine = MapleEngine;
