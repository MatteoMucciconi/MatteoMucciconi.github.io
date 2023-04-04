---
layout: page
title: Skew Young Tableau
permalink: /applets/skew-young-tableau/
---

## Skew Young Tableau Visualization

This applet allows you to visualize a skew Young Tableau based on your input.

<div id="young-tableau-applet">
  <div id="tableau-grid"></div>
  <button id="check-diagram">Check Diagram</button>
  <div id="message"></div>
</div>

<script>
  // Generate the 10x10 grid
  function createGrid() {
    var grid = document.getElementById('tableau-grid');
    for (var i = 0; i < 10; i++) {
      var rowElement = document.createElement('div');
      rowElement.classList.add('tableau-row');
      for (var j = 0; j < 10; j++) {
        var cellElement = document.createElement('div');
        cellElement.classList.add('tableau-cell');
        cellElement.dataset.row = i;
        cellElement.dataset.col = j;
        cellElement.addEventListener('click', toggleCell);
        rowElement.appendChild(cellElement);
      }
      grid.appendChild(rowElement);
    }
  }

  // Toggle cell selection
  function toggleCell(event) {
    var cell = event.target;
    cell.classList.toggle('selected');
  }

  // Check if the selected cells form a Young diagram
  // Check if the selected cells form a Young diagram
function checkDiagram() {
  var selectedCells = document.querySelectorAll('.tableau-cell.selected');
  var selectedCellsSet = new Set();
  selectedCells.forEach(function (cell) {
    var row = parseInt(cell.dataset.row);
    var col = parseInt(cell.dataset.col);
    selectedCellsSet.add(`${row}-${col}`);
  });

  var extDiagram = extYoungDiagram(selectedCellsSet);
  var youngDiagram = true;

  if (selectedCellsSet.size !== extDiagram.size) {
    youngDiagram = false;
  } else {
    selectedCellsSet.forEach(function (cell) {
      if (!extDiagram.has(cell)) {
        youngDiagram = false;
      }
    });
  }

  var message = document.getElementById('message');
  if (youngDiagram) {
    message.innerHTML = "This is a Young diagram";
  } else {
    message.innerHTML = "This is not a Young diagram";
  }
}

function extYoungDiagram(C) {
  let S = new Set();

  C.forEach((cell) => {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    for (let i = 0; i <= row; i++) {
      for (let j = 0; j <= col; j++) {
        S.add(`${i}-${j}`);
      }
    }
  });

  return S;
}



  // Display the message
  function displayMessage(youngDiagram) {
    var outputMessage = document.getElementById('output-message');
    outputMessage.innerHTML = youngDiagram ? "This is a Young diagram." : "This is not a Young diagram.";
  }

  // Event listeners
  document.getElementById('check-diagram').addEventListener('click', checkDiagram);

  // Initialize the grid
  createGrid();
</script>
