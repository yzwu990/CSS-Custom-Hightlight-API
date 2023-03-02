const textNode = document.getElementById("rainbow-text").firstChild;

if (CSS.highlights) {

    const highlights = [];
    for (let i = 0; i < 7; i++) {
        // Instantiate a Highlight object for each color
        const colorHighlight = new Highlight();
        highlights.push(colorHighlight);

        // register highlights
        CSS.highlights.set(`rainbow-color-${i + 1}`, colorHighlight);
    }

    // Iterate over text nodes
    for (let i = 0; i < textNode.textContent.length; i++) {
        // Create a range for each character
        const range = new Range();

        // Select the start node and the end node.
        // Since we set one colour for one character
        // the range is i+1
        range.setStart(textNode, i);
        range.setEnd(textNode, i + 1);

        // add to highlights
        highlights[i % 7].add(range);
    }
}
