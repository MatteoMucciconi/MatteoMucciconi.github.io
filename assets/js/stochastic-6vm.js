
let n;

// Initialize the grid with the default size
createGrid();

function updateProbabilities() {
    const a = parseFloat(document.getElementById('input-a').value) || 0;
    const b = parseFloat(document.getElementById('input-b').value) || 0;
    document.getElementById('prob-1-0-1-0').textContent = a;
    document.getElementById('prob-1-0-0-1').textContent = 1 - a;
    document.getElementById('prob-0-1-0-1').textContent = b;
    document.getElementById('prob-0-1-1-0').textContent = 1 - b;
}

function createGrid() {
    n = parseInt(document.getElementById('input-n').value) || 10;
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';

    const cellSize = (600 - 2 * n) / n; // Calculate the cell size based on the fixed width of the grid container

    for (let row = 0; row < n; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.style.display = 'flex';

        for (let col = 0; col < n; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.width = cellSize + 'px';
            cell.style.height = cellSize + 'px';

            rowDiv.appendChild(cell);
        }

        gridContainer.appendChild(rowDiv);
    }
}


function randomVertexConfiguration(a, b, left, down) {
    
    const random = Math.random();

    if (left === 0 && down === 0) {
        return { up: 0, right: 0 };
    }

    if (left === 1 && down === 1) {
        return { up: 1, right: 1 };
    }

    if (left === 0 && down === 1) {
        if (random <= a){
            return { up: 1, right: 0 };
        } else{
            return { up: 0, right: 1 };   
        }  
    }

    if (left === 1 && down === 0) {
        if (random <= b){
            return { up: 0, right: 1 };
        } else{
            return { up: 1, right: 0 };   
        }
    }
}

function initializeBoundaryConditions(cells, n, type) {
    if (type === 'step') {
        // Initialize step boundary conditions
        for (let row = 0; row < n; row++) {
            const index = row * n;
            const cell = cells[index];
            cell.dataset.left = 1;
        }

        for (let col = 0; col < n; col++) {
            const index = col;
            const cell = cells[index];
            cell.dataset.down = 0;
        }
    }

  // Add more boundary conditions here
}

// Create gridH and gridV matrices
let gridH = new Array(n + 1).fill(null).map(() => new Array(n).fill(0));
let gridV = new Array(n).fill(null).map(() => new Array(n + 1).fill(0));

// Initialize the boundary conditions
for (let j = 0; j < n; j++) {
    gridH[0][j] = 0; // Set the bottom row to 0
}

for (let i = 0; i < n; i++) {
    gridV[i][0] = 1; // Set the leftmost column to 1
}


function startSimulation() {
    const a = parseFloat(document.getElementById('input-a').value) || 0.5;
    const b = parseFloat(document.getElementById('input-b').value) || 0.5;

    let gridH = new Array(n + 1).fill(null).map(() => new Array(n).fill(0));
    let gridV = new Array(n).fill(null).map(() => new Array(n+1).fill(0));

    // Initialize the boundary conditions
    for (let j = 0; j < n; j++) {
        gridH[0][j] = 0; // Set the bottom row to 0
    }
    for (let i = 0; i < n; i++) {
        gridV[i][0] = 1; // Set the leftmost column to 1
    }

    // Main loop to assign vertex configurations
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            const left = gridV[row][col];
            const down = gridH[row][col];

            const { up: u, right: r } = randomVertexConfiguration(a, b, left, down);

            // Assign the vertex configuration to the current cell
            gridH[row+1][col] = u;
            gridV[row][col+1] = r;
        }
    }
    renderGrid(gridH, gridV);
}

function renderGrid(gridH, gridV) {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';

    const cellSize = (600 - 2 * n) / n; // Calculate the cell size based on the fixed width of the grid container
    
    for (let row = 0; row < n; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.style.display = 'flex';

        for (let col = 0; col < n; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell'; 
            cell.style.width = cellSize + 'px';
            cell.style.height = cellSize + 'px';

            const left = gridV[n-row-1][col];
            const down = gridH[n-row-1][col];
            const up = gridH[n-row][col];
            const right = gridV[n-row-1][col+1];

            if (left === 1) {
                const edgeLeft = document.createElement('div');
                edgeLeft.className = 'edge left';
                edgeLeft.style.width = cellSize / 2 + 'px';
                cell.appendChild(edgeLeft);
            }

            if (down === 1) {
                const edgeDown = document.createElement('div');
                edgeDown.className = 'edge down';
                cell.appendChild(edgeDown);
            }

            if (up === 1) {
                const edgeUp = document.createElement('div');
                edgeUp.className = 'edge up';
                cell.appendChild(edgeUp);
            }

            if (right === 1) {
                const edgeRight = document.createElement('div');
                edgeRight.className = 'edge right';
                edgeRight.style.width = cellSize / 2 + 'px';
                cell.appendChild(edgeRight);
            }

            rowDiv.appendChild(cell);
        }

        gridContainer.appendChild(rowDiv);
    }
}
