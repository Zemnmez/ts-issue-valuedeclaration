import * as ts from "typescript";

const p = ts.createProgram(["t.d.ts"], {});
const c = p.getTypeChecker();
p.getSourceFiles().map(f => {
    f.forEachChild(n => {
        if (!ts.isModuleDeclaration(n)) return;
        const s = c.getSymbolAtLocation(n.name);
        if (!s) return;

        const scanMembers = (s: ts.Symbol) => {
            if (s.valueDeclaration === undefined)
                console.log("missing valueDeclaration on", s.getName());
            if (!s.exports) return;
            if (!(Symbol.iterator in s.exports))
                return console.log("not iterable", s.getName())
            for (let [/*name*/, member] of (s.exports as Map<ts.__String, ts.Symbol>)) {
                scanMembers(member);
            }
        }

        scanMembers(s);


    })
})
