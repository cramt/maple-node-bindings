"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const process = __importStar(require("child_process"));
const MAPLE_START_MESSAGE = "    |\\^/|     Maple 2018 (IBM INTEL NT)\r\n._|\\|   |/|_. Copyright (c) Maplesoft, a division of Waterloo Maple Inc. 2018\r\n \\  MAPLE  /  All rights reserved. Maple is a trademark of\r\n <____ ____>  Waterloo Maple Inc.\r\n      |       Type ? for help.\r\n";
class MapleEngine {
    constructor(pathToCMaple) {
        this.active = false;
        this.currentResolver = null;
        this.currentRejecter = null;
        this.mapleProcess = process.spawn(pathToCMaple);
        this.mapleProcess.stdout.on("data", (_data) => {
            let data = _data.toString();
            if (this.active) {
                if (data[0] === ">") {
                    return;
                }
                let splitData = data.split("\"");
                if (splitData.length < 3) {
                    if (this.currentRejecter !== null) {
                        this.currentRejecter("something went wrong\r\n" + data);
                    }
                    this.clear();
                    return;
                }
                splitData[0] = "";
                splitData[splitData.length - 1] = "";
                let joinedData = splitData.join("\"");
                let parsedData = joinedData.substring(1, joinedData.length - 1);
                if (this.currentResolver) {
                    this.currentResolver(parsedData);
                }
                this.clear();
            }
            if (data === MAPLE_START_MESSAGE) {
                //this.mapleProcess.stdin.write("D(x->x^sin(x));\r\n")
                this.active = true;
            }
        });
        this.mapleProcess.stderr.on("data", console.log);
        this.mapleProcess.on("close", (code, signal) => {
            console.log("maple process closed with code " + code);
        });
    }
    clear() {
        this.currentRejecter = null;
        this.currentResolver = null;
    }
    eval(equation) {
        return (new Promise((resolve, reject) => {
            this.currentRejecter = reject;
            this.currentResolver = resolve;
            equation = "convert(" + equation + ", string);\r\n";
            this.mapleProcess.stdin.write(equation);
        })).then(x => x.includes("->") ? ("(" + x + ")") : x);
    }
    evalf(equation) {
        equation = "evalf(" + equation + ")";
        return this.eval(equation);
    }
}
exports.MapleEngine = MapleEngine;
