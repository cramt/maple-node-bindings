import * as process from "child_process";

const MAPLE_START_MESSAGE = "    |\\^/|     Maple 2018 (IBM INTEL NT)\r\n._|\\|   |/|_. Copyright (c) Maplesoft, a division of Waterloo Maple Inc. 2018\r\n \\  MAPLE  /  All rights reserved. Maple is a trademark of\r\n <____ ____>  Waterloo Maple Inc.\r\n      |       Type ? for help.\r\n"


export class MapleEngine {
    mapleProcess: process.ChildProcess;
    constructor(pathToCMaple: string) {
        this.mapleProcess = process.spawn(pathToCMaple);
        this.mapleProcess.stdout.on("data", (_data) => {
            let data: string = _data.toString();
            if (this.active) {
                if (data[0] === ">") {
                    return;
                }
                let splitData = data.split("\"");
                if (splitData.length < 3) {
                    if (this.currentRejecter !== null) {
                        this.currentRejecter("something went wrong\r\n" + data)
                    }
                    this.clear()
                    return;
                }
                splitData[0] = ""
                splitData[splitData.length - 1] = ""
                let joinedData = splitData.join("\"");
                let parsedData = joinedData.substring(1, joinedData.length - 1);
                if (this.currentResolver) {
                    this.currentResolver(parsedData);
                }
                this.clear()
            }
            if (data === MAPLE_START_MESSAGE) {
                this.active = true;
            }

        });
        this.mapleProcess.stderr.on("data", console.log)
        this.mapleProcess.on("close", (code, signal) => {
            console.log("maple process closed with code " + code)
        })
    }
    private active: boolean = false;
    private clear(): void {
        this.currentRejecter = null;
        this.currentResolver = null;
    }
    private currentResolver: ((value?: string | PromiseLike<string> | undefined) => void) | null = null;
    private currentRejecter: ((reason?: any) => void) | null = null
    public eval(equation: string): Promise<string> {
        return (new Promise<string>((resolve, reject) => {
            this.currentRejecter = reject
            this.currentResolver = resolve
            equation = "convert(" + equation + ", string);\r\n";
            this.mapleProcess.stdin.write(equation)
        })).then(x => x.includes("->") ? ("(" + x + ")") : x)
    }
    public evalf(equation: string): Promise<string> {
        equation = "evalf(" + equation + ")"
        return this.eval(equation);
    }
}