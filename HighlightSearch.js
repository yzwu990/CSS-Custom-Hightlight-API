const query = document.getElementById("query");
const article = document.querySelector("article");

// create createTreeWalker iterator，find all nodes and save to the array
const treeWalker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
const allTextNodes = [];
let currentNode = treeWalker.nextNode();
while (currentNode) {
    allTextNodes.push(currentNode);
    currentNode = treeWalker.nextNode();
}

// Listen to the input event to run the search.
query.addEventListener("input", () => {
    // does the browser support highlight？
    if (!CSS.highlights) {
        article.textContent = "CSS Custom Highlight API not supported.";
        return;
    }

    // clear previous search results
    CSS.highlights.clear();

    // Clean up the search query if it's empty
    const str = query.value.trim().toLowerCase();
    if (!str) {
        return;
    }

    // Iterate over all text nodes and find matches
    const ranges = allTextNodes
        .map((el) => {
            return { el, text: el.textContent.toLowerCase() };
        })
        .map(({ text, el }) => {
            const indices = [];
            let startPos = 0;
            while (startPos < text.length) {
                const index = text.indexOf(str, startPos);
                if (index === -1) break;
                indices.push(index);
                startPos = index + str.length;
            }

            // Create a range object for each instance of
            // str we found in the text node
            return indices.map((index) => {
                const range = new Range();
                range.setStart(el, index);
                range.setEnd(el, index + str.length);
                return range;
            });
        });

    // Create a Highlight object for the ranges
    const searchResultsHighlight = new Highlight(...ranges.flat());

    // Register the Highlight objects
    CSS.highlights.set("search-results", searchResultsHighlight);
});
