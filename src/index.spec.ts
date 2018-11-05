import { MapleEngine } from ".";
import { expect } from 'chai';
import 'mocha';

let maple = new MapleEngine("C:\\Program Files (x86)\\Maple 2018\\bin.win\\cmaple.exe")
describe("initialize main", () => {
    it("should calculate the function", () => {
        maple.eval("D(x->x^sin(x))").then(x => maple.evalf(x + "(32)").then(x => {
            expect(x).to.equal("19.66248767")
        })).catch(console.error)
    })
})