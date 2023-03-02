const highlights = function (pre) {
    pre.normalize();
    const words = hljs.highlight(pre.textContent, {
        language: pre.getAttribute("lang"),
    })._emitter.rootNode.children;
    console.log(words);
    CSS.highlights.clear();
    // const el = pre.firstChild
    const nodes = pre.firstChild;
    const text = nodes.textContent;
    const highlightMap = {};
    let startPos = 0;
    words
        .filter((el) => el.scope)
        .forEach((el) => {
            const str = el.children[0];
            const scope = el.scope;
            const index = text.indexOf(str, startPos);
            if (index < 0) {
                return;
            }
            const item = {
                start: index,
                scope: scope,
                end: index + str.length,
                str: str,
            };
            if (highlightMap[scope]) {
                highlightMap[scope].push(item);
            } else {
                highlightMap[scope] = [item];
            }
            startPos = index + str.length;
        });
    console.log(highlightMap);
    Object.entries(highlightMap).forEach(function ([k, v]) {
        const ranges = v.map(({ start, end }) => {
            const range = new Range();
            range.setStart(nodes, start);
            range.setEnd(nodes, end);
            return range;
        });
        const highlight = new Highlight(...ranges.flat());
        CSS.highlights.set(k, highlight);
    });
};

highlights(code);
code.addEventListener("input", function () {
    highlights(this);
});
