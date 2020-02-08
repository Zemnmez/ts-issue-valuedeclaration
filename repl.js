"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts = __importStar(require("typescript"));
const p = ts.createProgram(["t.d.ts"], {});
const c = p.getTypeChecker();
p.getSourceFiles().map(f => {
    f.forEachChild(n => {
        if (!ts.isModuleDeclaration(n))
            return;
        const s = c.getSymbolAtLocation(n.name);
        if (!s)
            return;
        const scanMembers = (s) => {
            if (s.valueDeclaration === undefined)
                console.log("missing valueDeclaration", s.getName());
            if (!s.exports)
                return;
            if (!(Symbol.iterator in s.exports))
                return console.log("not iterable", s.getName());
            for (let [/*name*/ , member] of s.exports) {
                scanMembers(member);
            }
        };
        scanMembers(s);
    });
});
