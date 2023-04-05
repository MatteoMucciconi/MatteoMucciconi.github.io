$(document).ready(function () {
    var shapeY = new Set();
    var shapeYPrime = new Set();
    var shapeW = new Set();
    var labeledCells = new Set();

    let step = 1;
    let labelCounter = 1;
  
    $('.grid-item').click(function () {
      if (step === 1) {
        $(this).toggleClass('yellow');
        const id = $(this).attr('id');
        shapeY.has(id) ? shapeY.delete(id) : shapeY.add(id);
      } else if (step === 2 && shapeY.has($(this).attr('id'))) {
        $(this).toggleClass('red');
        const id = $(this).attr('id');
        shapeYPrime.has(id) ? shapeYPrime.delete(id) : shapeYPrime.add(id);
      } else if (step === 3 && shapeY.has($(this).attr('id')) && !shapeYPrime.has($(this).attr('id'))) {
        const id = $(this).attr('id');
        
        if (!$(this).text()) {
            const newShapeW = new Set(Array.from(shapeW).concat([id]));
            if (isYoungDiagram(Array.from(newShapeW))) {
                shapeW = newShapeW;
                labeledCells.add(id)
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
    }
  });
    
  
    $('#button3').click(function () {
        if (step === 3 && labeledCells.size === shapeY.size - shapeYPrime.size) {
            const tableau = createTableauList(shapeY, shapeYPrime, labeledCells);
            $('#message-3').html(`Standard Young Tableau T:<br>${tableau.map(row => row.join('&nbsp &nbsp')).join('<br>')}`);
        } else {
            $('#message-3').text('Label all the cells');
        }
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
  

  function createTableauList(shapeY, shapeYPrime, labeledCells) {
    const tableau = [];
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
        tableau.push(rowArray);
      }
    }
  
    return tableau;
  }
 
  
  
  