---
layout: default
title: Young Diagram Applet
permalink: /applets/young-diagram/
---

# Young Diagram Applet

<style>
    canvas {
        border: 1px solid black;
    }
</style>

<canvas id="youngDiagram" width="500" height="500"></canvas>
<button id="selectYoungDiagram">Select Young Diagram</button>
<div id="partitionResult"></div>

<!-- 
<div id="selectedCells"></div>
<div id="youngDiagramResult"></div>
<div id="isYoungDiagramResult"></div>
-->


<script>
const canvas = document.getElementById("youngDiagram");
const ctx = canvas.getContext("2d");
const selectedCells = document.getElementById("selectedCells");
const youngDiagramResult = document.getElementById("youngDiagramResult");
const isYoungDiagramResult = document.getElementById("isYoungDiagramResult");
const selectYoungDiagramButton = document.getElementById("selectYoungDiagram");
const partitionResult = document.getElementById("partitionResult");


const gridSize = 10;
const cellSize = 50;
const cellColor = "gold";

let grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));
let gridFrozen = false;

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j]) {
                ctx.fillStyle = cellColor;
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }

            ctx.strokeStyle = "black";
            ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
}

canvas.addEventListener("click", (e) => {

    if (gridFrozen) {
        return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    grid[row][col] = !grid[row][col];

    drawGrid();
    updateSelectedCellsList();
});

function updateSelectedCellsList() {
    const selected = getSelectedCells();

    const isYoung = isYoungDiagram(selected);

    const partition = fromCellsToPartition(selected);
    if (partition) {
        partitionResult.innerHTML = `Partition: (${partition.join(", ")})`;
    } else {
        partitionResult.innerHTML = "Partition: Not a Young Diagram";
    }
}


selectYoungDiagramButton.addEventListener("click", () => {
    const selected = getSelectedCells();
    if (isYoungDiagram(selected)) {
        gridFrozen = true;
        selectYoungDiagramButton.disabled = true;
    }
});

function youngDiagram(selectedCells) {
    const S = new Set();

    selectedCells.forEach(([row, col]) => {
        for (let i = 0; i <= row; i++) {
            for (let j = 0; j <= col; j++) {
                const cellString = `${i},${j}`;
                S.add(cellString);
            }
        }
    });

    return S;
}

function isYoungDiagram(selectedCells) {
    const youngDiagramSet = youngDiagram(selectedCells);
    if (selectedCells.length !== youngDiagramSet.size) {
        return false;
    }

    for (let [row, col] of selectedCells) {
        const cellString = `${row},${col}`;
        if (!youngDiagramSet.has(cellString)) {
            return false;
        }
    }

    return true;
}

function getSelectedCells() {
    const selected = [];

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j]) {
                selected.push([i, j]);
            }
        }
    }

    return selected;
}

function fromCellsToPartition(selectedCells) {
    if (!isYoungDiagram(selectedCells)) {
        return null;
    }

    const rowCounts = {};

    selectedCells.forEach(([row, col]) => {
        if (!rowCounts[row]) {
            rowCounts[row] = 0;
        }
        rowCounts[row]++;
    });

    const partition = Object.values(rowCounts);

    return partition;
}


drawGrid();
updateSelectedCellsList();
</script>
