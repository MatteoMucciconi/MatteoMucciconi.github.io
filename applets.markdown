---
layout: page
title: Applets
permalink: /applets/
---

## Standard Young Tableau Visualization

This applet allows you to visualize a standard Young Tableau based on your input.

<div id="young-tableau-applet">
  <div id="tableau-grid"></div>
  <button id="build-tableau">Build Tableau</button>
  <div id="tableau-output"></div>
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

  // Build the tableau
  function buildTableau() {
    var selectedCells = document.querySelectorAll('.tableau-cell.selected');
    var tableau = [];

    selectedCells.forEach(function(cell) {
      var row = parseInt(cell.dataset.row);
      var col = parseInt(cell.dataset.col);
      if (!tableau[row]) {
        tableau[row] = [];
      }
      tableau[row][col] = true;
    });

    // Process and display the tableau
    displayTableau(tableau);
  }

  // Display the tableau (update this function as needed)
  function displayTableau(tableau) {
    var output = document.getElementById('tableau-output');
    output.innerHTML = JSON.stringify(tableau);
  }

  // Event listeners
  document.getElementById('build-tableau').addEventListener('click', buildTableau);

  // Initialize the grid
  createGrid();
</script>
