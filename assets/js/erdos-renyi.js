function generateElements(k, p) {
  const nodes = [];
  const edges = [];

  for (let i = 1; i <= k; i++) {
    nodes.push({ data: { id: `n${i}`, label: `Node ${i}` } });

    for (let j = 1; j < i; j++) {
      if (Math.random() <= p) {
        edges.push({ data: { id: `e${j}_${i}`, source: `n${j}`, target: `n${i}` } });
      }
    }
  }

  return nodes.concat(edges);
}


function createGraph(k, p) {
  const cy = cytoscape({
    container: document.getElementById("cy"),

    elements: generateElements(k, p),

    style: [
      {
        selector: "node",
        style: {
          "background-color": "orange",
          //"label": "data(label)",
          "text-wrap": "wrap",
          "text-max-width": "80px",
          "text-valign": "center",
        },
      },
      {
        selector: "edge",
        style: {
          "width": 3,
          "line-color": "#ccc",
          "target-arrow-color": "#ccc",
          "target-arrow-shape": "triangle",
          "curve-style": "bezier",
        },
      },
    ],
  });

  // Sort connected components by size
  const components = cy.elements().components();
  components.sort((a, b) => b.length - a.length);

  let yOffset = 0;

  components.forEach((component) => {
    // Apply the 'circle' layout to the connected component
    const layout = component.layout({
      name: "circle",
      fit: true,
      padding: 30,
      spacingFactor: 1.5,
      avoidOverlap: true,
      avoidOverlapPadding: 10,
      startAngle: (3 / 2) * Math.PI,
      sweep: undefined,
      clockwise: true,
      sort: undefined,
      animate: false,
    });

    layout.run();

    // Calculate the bounding box of the connected component
    const boundingBox = component.boundingBox();

    // Calculate the height of the bounding box and add some padding
    const boxHeight = boundingBox.y2 - boundingBox.y1 + 50;

    // Move the connected component vertically based on the yOffset
    component.positions((node) => {
      const currentPosition = node.position();
      return { x: currentPosition.x, y: currentPosition.y + yOffset };
    });

    // Update yOffset for the next connected component
    yOffset += boxHeight;
  });

  // Group connected components by size
  const groupedComponents = components.reduce((groups, component) => {
    const size = component.length;
    if (!groups[size]) {
      groups[size] = [];
    }
    groups[size].push(component);
    return groups;
  }, {});

  yOffset = 0;

  let largestWidth = 0;
  Object.keys(groupedComponents).forEach((size) => {
    const componentsInRow = groupedComponents[size];
    const totalWidthInRow = componentsInRow.reduce((totalWidth, component) => {
      const boundingBox = component.boundingBox();
      return totalWidth + boundingBox.x2 - boundingBox.x1 + 50; // Add 50 pixels of padding between components
    }, 0);
    largestWidth = Math.max(largestWidth, totalWidthInRow);
  });

  // Iterate through groups of connected components sorted by size
  Object.keys(groupedComponents).sort((a, b) => b - a).forEach((size) => {
    const componentsInRow = groupedComponents[size];
    let maxHeightInRow = 0;

    // Calculate the total width of all components in the row
    const totalWidthInRow = componentsInRow.reduce((totalWidth, component) => {
      const boundingBox = component.boundingBox();
      return totalWidth + boundingBox.x2 - boundingBox.x1 + 50; // Add 50 pixels of padding between components
    }, 0);

    // Calculate the initial xOffset to center the components in the row
    let xOffset = (largestWidth - totalWidthInRow) / 2;

    componentsInRow.forEach((component) => {
      // Apply the 'circle' layout to the connected component
      const layout = component.layout({
        name: "circle",
        fit: true,
        padding: 30,
        spacingFactor: 1.5,
        avoidOverlap: true,
        avoidOverlapPadding: 10,
        startAngle: (3 / 2) * Math.PI,
        sweep: undefined,
        clockwise: true,
        sort: undefined,
        animate: false,
      });

      layout.run();

      // Calculate the bounding box of the connected component
      const boundingBox = component.boundingBox();

      // Calculate the height of the bounding box and add some padding
      const boxHeight = boundingBox.y2 - boundingBox.y1 + 50;
      const boxWidth = boundingBox.x2 - boundingBox.x1 + 50;

      // Update maxHeightInRow
      maxHeightInRow = Math.max(maxHeightInRow, boxHeight);

      // Move the connected component to the new position
      component.positions((node) => {
        const currentPosition = node.position();
        return { x: currentPosition.x + xOffset, y: currentPosition.y + yOffset };
      });

      // Update xOffset for the next connected component in the same row
      xOffset += boxWidth;
    });

    // Update yOffset for the next row of connected components
    yOffset += maxHeightInRow;
  });

  // Fit the entire graph within the container with some padding
  cy.fit(30);

  const numberOfComponents = components.length;
  const componentsDisplay = document.getElementById("connected-components");
  componentsDisplay.innerHTML = `Number of connected components = ${numberOfComponents}`;

}




document.addEventListener("DOMContentLoaded", function () {
  const generateButton = document.getElementById("generate-graph");
  generateButton.addEventListener("click", function () {
    const kValue = document.getElementById("k-value").value;
    const pValue = document.getElementById("p-value").value;
    createGraph(parseInt(kValue), parseFloat(pValue));
  });
});


