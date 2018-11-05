"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
let a = new main_1.MapleEngine("C:\\Program Files (x86)\\Maple 2018\\bin.win\\cmaple.exe");
a.eval("D(x->x^sin(x))").then(x => a.evalf(x + "(32)").then(console.log)).catch(console.error);
