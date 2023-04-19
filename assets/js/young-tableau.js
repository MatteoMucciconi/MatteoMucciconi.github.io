$(document).ready(function () {
    var shapeY = new Set();
    var shapeYPrime = new Set();
    var shapeW = new Set();
    var labeledCells = new Set();
    var labeledCellsQ = new Set();
    var tableauP = [];
    var tableauQ = [];
    var updatedTableauP = [];
    var updatedTableauQ = [];
    var n = 0;



    let step = 1;
    let labelCounter = 1;
  
    $('.grid-item').click(function () {
      if (step === 1) {
        $(this).toggleClass('orange');
        const id = $(this).attr('id');
        shapeY.has(id) ? shapeY.delete(id) : shapeY.add(id);
      } if (step === 2 && shapeY.has($(this).attr('id'))) {
        $(this).toggleClass('gray');
        const id = $(this).attr('id');
        shapeYPrime.has(id) ? shapeYPrime.delete(id) : shapeYPrime.add(id);
      } if (step === 3 && shapeY.has($(this).attr('id')) && !shapeYPrime.has($(this).attr('id'))) {
        const id = $(this).attr('id');
        
        if (!$(this).text()) {
          const newShapeW = new Set(Array.from(shapeW).concat([id]));
          if (isYoungDiagram(Array.from(newShapeW))) {
            shapeW = newShapeW;
            labeledCells.add(id)
            $(this).text(labelCounter++);
          }
        }
      } if (step === 4 && shapeY.has($(this).attr('id')) && !shapeYPrime.has($(this).attr('id'))) {
        const id = $(this).attr('id');
        
        if (!$(this).text()) {
          const newShapeW = new Set(Array.from(shapeW).concat([id]));
          if (isYoungDiagram(Array.from(newShapeW))) {
            shapeW = newShapeW;
            labeledCellsQ.add(id)
            $(this).text(labelCounter++);
          }
        }
      }
    });
  

    $('#button1').click(function () {
        const isYoungDiagramResult = isYoungDiagram(Array.from(shapeY));
      
        if (isYoungDiagramResult) {
          $('#message-1').text(`External shape = ${Array.from(shapeToPartition(shapeY)).join(', ')}`);
        } else {
          $('#message-1').text('The external shape selected is not a Young diagram');
        }
      
        if (step === 1 && isYoungDiagramResult) {
            step = 2;
        }
      });
  
    $('#button2').click(function () {
      const isYoungDiagramResult = isYoungDiagram(Array.from(shapeYPrime));
      
      if (isYoungDiagramResult) {
          $('#message-2').text(`Internal shape = ${Array.from(shapeToPartition(shapeYPrime)).join(', ')}`);
        } else {
          $('#message-2').text('The internal shape selected is not a Young diagram');
        }

      if (step === 2 && isYoungDiagramResult) {
          step = 3;
          shapeW = new Set(shapeYPrime); // Set shapeW equal to shapeYPrime
          n = shapeY.size - shapeYPrime.size;
      }
    });

    $('#button3').click(function () {
      if (step === 3) {
        if(labeledCells.size === n) {
          tableauP = createTableauList(shapeY, shapeYPrime);
          const formattedTableau = tableauP.map(row => row.map(cell => `<span class="tableau-cell">${cell}</span>`).join('')).join('<br>');
          $('#message-3').html(`Standard Young Tableau T:<br>${formattedTableau}`);
          $('.grid-item').text(''); // Clear the grid
          labelCounter = 1; // Reset the label counter
          step = 4; // Move to Step 4
          shapeW = new Set(shapeYPrime); // Set shapeW equal to shapeYPrime
        } else {
          $('#message-3').text('Label all the cells');
        }
      }
    });
    
    $('#button4').click(function () {
      if (step === 4) {
        if(labeledCellsQ.size === n) {
          tableauQ = createTableauList(shapeY, shapeYPrime);
          const formattedTableauQ = tableauQ.map(row => row.map(cell => `<span class="tableau-cell">${cell}</span>`).join('')).join('<br>');
          $('#message-4').html(`Standard Young Tableau Q:<br>${formattedTableauQ}`);
          populateTableauGrid(tableauP, 'tableau-t-grid-container');
          populateTableauGrid(tableauQ, 'tableau-q-grid-container');
          $('#operation-buttons').css('display', 'block'); // Show the new buttons
          [updatedTableauP, updatedTableauQ] = [tableauP,tableauQ]
        } else {
          $('#message-4').text('Label all the cells');
        }
      }
    });

    $('#iota1').click(function () {
      [updatedTableauP,updatedTableauQ] = iota1(updatedTableauP,updatedTableauQ)
      // Update the displayed tableaux using the updatedTableauP and updatedTableauQ
      populateTableauGrid(updatedTableauP, 'tableau-t-grid-container');
      populateTableauGrid(updatedTableauQ, 'tableau-q-grid-container');
    });
    
    $('#iota2').click(function () {
      [updatedTableauP,updatedTableauQ] = iota2(updatedTableauP,updatedTableauQ)
      // Update the displayed tableaux using the updatedTableauP and updatedTableauQ
      populateTableauGrid(updatedTableauP, 'tableau-t-grid-container');
      populateTableauGrid(updatedTableauQ, 'tableau-q-grid-container');
    });

    $('#skewRSK').click(function () {
      [updatedTableauP,updatedTableauQ] = skewRSK(updatedTableauP,updatedTableauQ,n)
      // Update the displayed tableaux using the updatedTableauP and updatedTableauQ
      populateTableauGrid(updatedTableauP, 'tableau-t-grid-container');
      populateTableauGrid(updatedTableauQ, 'tableau-q-grid-container');
    });

    $('#restart-dynamics').click(function () {
      // Reset the displayed tableaux to the original tableauP and tableauQ
      [updatedTableauP, updatedTableauQ] = [tableauP,tableauQ]
      populateTableauGrid(updatedTableauP, 'tableau-t-grid-container');
      populateTableauGrid(updatedTableauQ, 'tableau-q-grid-container');
    });

    $('#restart').click(function () {
      // Reset variables
      step = 1;
      labelCounter = 1;
      shapeY.clear();
      shapeYPrime.clear();
      labeledCells.clear();
      labeledCellsQ.clear();
      
      // Clear grid items and messages
      $('.grid-item').removeClass('orange gray').text('');
      $('#message-1').text('');
      $('#message-2').text('');
      $('#message-3').text('');
      $('#message-4').text('');
      $('#tableau-t-grid-container, #tableau-q-grid-container').empty();
      $('#operation-buttons').css('display', 'none'); // Hide the new buttons
    });

  });
  
  function youngDiagram(C) {
    let D = new Set();
  
    C.forEach((cell) => {
      const [i, j] = cell.split('-').map(Number);
  
      for (let iPrime = 1; iPrime <= i; iPrime++) {
        for (let jPrime = 1; jPrime <= j; jPrime++) {
          D.add(`${iPrime}-${jPrime}`);
        }
      }
    });
  
    return Array.from(D);
  }
  
  function isYoungDiagram(C) {
    const D = new Set(youngDiagram(C));
    const setC = new Set(C);
  
    return D.size === setC.size && Array.from(setC).every((cell) => D.has(cell));
  }
  
  function shapeToPartition(Y) {
    const rowCounts = {};
  
    Y.forEach((cell) => {
      const [i, _] = cell.split('-').map(Number);
  
      if (rowCounts[i]) {
        rowCounts[i]++;
      } else {
        rowCounts[i] = 1;
      }
    });
  
    const partition = Object.values(rowCounts).sort((a, b) => b - a);
    return partition;
  }
  

  function createTableauList(shapeY, shapeYPrime) {
    const tableauP = [];
    const numRows = 10;
    const numCols = 10;
  
    for (let i = 1; i <= numRows; i++) {
      const rowArray = [];
      for (let j = 1; j <= numCols; j++) {
        const cellId = `${i}-${j}`;
        if (shapeY.has(cellId)) {
          if (shapeYPrime.has(cellId)) {
            rowArray.push('*');
          } else {
            const cellLabel = $(`#${cellId}`).text();
            rowArray.push(parseInt(cellLabel, 10));
          }
        }
      }
      if (rowArray.length > 0) {
        tableauP.push(rowArray);
      }
    }
  
    return tableauP;
  }
 
  function populateTableauGrid(tableau, gridContainerId) {
    const rowCount = tableau.length;
    const colCount = tableau.reduce((max, row) => Math.max(max, row.length), 0);
  
    const gridContainer = $(`#${gridContainerId}`);
    gridContainer.css('grid-template-rows', `repeat(${rowCount}, 1fr)`);
    gridContainer.css('grid-template-columns', `repeat(${colCount}, 1fr)`);
  
    gridContainer.empty(); // Clear previous content
  
    tableau.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const gridItem = $('<div>').addClass('grid-item')
        if (cell === '*') {
          gridItem.text('');
          gridItem.addClass('gray');
        } else {
          gridItem.html(cell);
          gridItem.addClass('orange');
        }
        gridItem.css('grid-row', rowIndex + 1);
        gridItem.css('grid-column', colIndex + 1);
        gridContainer.append(gridItem);
      });
    });
  }

  function skewRSK(P, Q, n) {
    let PPrime = P;
    let QPrime = Q;
  
    for (let i = 0; i < n; i++) {
      [PPrime, QPrime] = iota1(PPrime, QPrime);
    }
  
    return [PPrime, QPrime];
  }
  

  function iota2(tableauP, tableauQ){
    let P = [];
    let Q = [];
    [Q,P] = iota1(tableauQ,tableauP);
    return [P,Q];
  }

  function iota1(tableauP, tableauQ) {
    let P = tableauP;
    let Q = tableauQ;
    let n = countLabels(P); 
    const i = findOne(P);
    if (i === -1){
      return [P, Q];
    }
    Q = internalInsertion(Q, i);
    let shapeQ = Q.map(row => row.length);
    P = cycleElements(P,shapeQ,n);

    return [P, Q];
  }
  
  
  function findOne(P) {
    for (let i = 0; i < P.length; i++) {
      const row = P[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] === 1) {
          return i;
        }
      }
    }
    return -1; // If the number 1 is not found, return -1 (you can handle this case as needed)
  }
  
  
  function internalInsertion(Q, i) {
    let QPrime = JSON.parse(JSON.stringify(Q)); // Make a deep copy of Q
    let iPrime = i;
    let k = '*';
    let row = QPrime[iPrime];
  
    while (k !== -1) {
      if (iPrime === QPrime.length) {
        QPrime.push([]); // Add an empty row if the row QPrime[iPrime] does not exist
      }
      row = QPrime[iPrime];
      [row, k] = bump(row, k);
      QPrime[iPrime] = row;
      iPrime++;
    }
  
    return QPrime;
  }
  
  
  function bump(row, k) {
    let rowPrime = row;
    for (let i = 0; i < rowPrime.length; i++) {
      if (k === '*' && rowPrime[i] !== '*') {
        let kPrime = rowPrime[i];
        rowPrime[i] = k;
        return [rowPrime, kPrime];
      } else if (k !== '*' && rowPrime[i] > k) {
        let kPrime = rowPrime[i];
        rowPrime[i] = k;
        return [rowPrime, kPrime];
      }
    }
    rowPrime.push(k);
    return [rowPrime, -1];
  }
  
  
  function cycleElements(P, shapeQ, n) {
    let PPrime = [];
    for (let i = 0; i < shapeQ.length; i++) {
      PPrime.push([]);
      for (let j = 0; j < shapeQ[i]; j++) {
        if (P[i]) {
          if (P[i][j] === undefined) {
            PPrime[i].push(n);
          } else if (P[i][j] == '*') {
            PPrime[i].push('*');
          } else if (P[i][j] == 1) {
            PPrime[i].push('*');
          } else if (P[i][j] > 1) {
            PPrime[i].push(P[i][j] - 1);
          }
        } else {
          PPrime[i].push(n);
        }
        
      }
    }
  
    return PPrime;
  }
  
  
  function countLabels(tableau) {
    return tableau.reduce((count, row) => {
      return count + row.reduce((rowCount, cell) => {
        return rowCount + (cell !== '*');
      }, 0);
    }, 0);
  }