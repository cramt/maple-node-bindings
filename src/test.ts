import { MapleEngine } from "./main";

let maple = new MapleEngine("C:\\Program Files (x86)\\Maple 2018\\bin.win\\cmaple.exe")
maple.eval("D(x->x^sin(x))").then(x => maple.evalf(x + "(32)").then(console.log)).catch(console.error)