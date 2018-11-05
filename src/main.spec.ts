import { MapleEngine } from "./main";
import { expect } from 'chai';
import 'mocha';

describe("initialize main", () => {
    let maple = new MapleEngine("C:\\Program Files (x86)\\Maple 2018\\bin.win\\cmaple.exe")
    it("should calculate the function", () => {
        maple.eval("D(x->x^sin(x))").then(x => maple.evalf(x + "(32)").then(x => {
            expect(x).to.equal("19.66248767")
        })).catch(console.error)
    })
})