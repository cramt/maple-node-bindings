import { MapleEngine } from "./main";

let a = new MapleEngine("C:\\Program Files (x86)\\Maple 2018\\bin.win\\cmaple.exe")
a.eval("D(x->x^sin(x))").then(x => a.evalf(x + "(32)").then(console.log)).catch(console.error)