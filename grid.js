// Get a reference to the grid
var grid = document.querySelector('#grid');

// Add an event listener to handle clicks on the grid cells
grid.addEventListener('click', handleClick);

// Array to keep track of clicked cells
var clickedCells = [];

var currentAction = "createCells";

// Function to handle clicks on the grid cells. In case the variable currentAction is set to createCells we will add the selected cell to the desired tableau. In case the variable currentAction is set to JdT it will perform one Jeu de Taquin move on the tableau
function handleClick(event) {

// Check if the click was on a grid cell
			if (event.target.nodeName === 'TD') {
      
      			// Get the selected cell
            var selectedCell = event.target;
      
      			if (currentAction == "createCells")
            {
            			// Adds a cell to the tableau at the selected location
            			createCell(selectedCell, clickedCells);
            
            }
             
            if (currentAction == "JdT"){
            
        					jeuDeTaquin(selectedCell, clickedCells);
             
            }
             
             // Remove the 'selected' class from all cells
             
             var cells = grid.querySelectorAll('td');
             
             for (var i = 0; i < cells.length; i++) {
             			cells[i].classList.remove('selected');
             }

             // Add the 'selected' class to the selected cell
             selectedCell.classList.add('selected');
			}
}


function createCell(selectedCell, clickedCells){
      
      // Get the coordinates of the selected cell
      var selectedCellCoords = [selectedCell.cellIndex, selectedCell.parentNode.rowIndex];
      
      // Check if the selected cell is valid
      if (isValidSelection(selectedCellCoords, clickedCells)) {
      
      			// Add the selected cell coordinates to the clickedCells array
            clickedCells.push(selectedCellCoords);
            
            // Fill the selected cell with a number
            selectedCell.innerHTML = clickedCells.length;
			}
}

function jeuDeTaquin(selectedCell, clickedCells){

			// Get the coordinates of the selected cell
      var selectedCellCoords = [selectedCell.cellIndex, selectedCell.parentNode.rowIndex];
      
      // Check if the selected cell is valid
      if (inJdtValidMove(selectedCellCoords, clickedCells)) {
      			
            var cellUp = [selectedCellCoords[0], selectedCellCoords[1] - 1];
            var cellLeft = [selectedCellCoords[0] - 1, selectedCellCoords[1]];
            
            if(cellUp[1]<0){
                  // if we selected a cell on the top side we fill selectedCell with the value of cellLeft and we make cellLeft empty
                  selectedCell.innerHTML = grid.rows[0].cells[cellLeft[0]].innerHTML;
                  grid.rows[0].cells[cellLeft[0]].innerHTML = '';
                  
            } else if(cellLeft[0]<0){
            
            			// if we selected a cell on the left side we fill selectedCell with the value of cellUp and we make cellUp empty
                  selectedCell.innerHTML = grid.rows[cellUp[1]].cells[0].innerHTML;
                  grid.rows[cellUp[1]].cells[0].innerHTML = '';
            
            } else {
            
            			if(grid.rows[cellUp[1]].cells[cellUp[0]].innerHTML < grid.rows[cellLeft[1]].cells[cellLeft[0]].innerHTML){
                  			selectedCell.innerHTML = grid.rows[cellLeft[1]].cells[cellLeft[0]].innerHTML;
                        grid.rows[cellLeft[1]].cells[cellLeft[0]].innerHTML = '';
                  } else if (grid.rows[cellUp[1]].cells[cellUp[0]].innerHTML > grid.rows[cellLeft[1]].cells[cellLeft[0]].innerHTML){
                  			selectedCell.innerHTML = grid.rows[cellUp[1]].cells[cellUp[0]].innerHTML;
                        grid.rows[cellUp[1]].cells[cellUp[0]].innerHTML = '';
                  }
            
            }
            
			}
      
      // Check if the selected cell is valid
      if (outJdtValidMove(selectedCellCoords, clickedCells)) {
      			
            var cellDown= [selectedCellCoords[0], selectedCellCoords[1] + 1];
            var cellRight = [selectedCellCoords[0] + 1, selectedCellCoords[1]];
            
			}

}

function inJdtValidMove(selectedCellCoords, clickedCells){

	return true;

}

function outJdtValidMove(selectedCellCoords, clickedCells){

	return true;

}

// Get a reference to the grid size form
var gridSizeForm = document.querySelector('#grid-size-form');

// Add an event listener to handle the submission of the grid size form
gridSizeForm.addEventListener('submit', handleSubmit);

// Function to handle the submission of the grid size form
function handleSubmit(event) {
  // Prevent the form from being submitted
  event.preventDefault();

  // Get the grid size from the form
  var gridSize = document.querySelector('#grid-size').value;

  // Reset the clickedCells array to an empty array
  clickedCells = [];
  
  // Reset the currentAction variable
  currentAction = "createCells";

  // Create the grid with the specified size
  createGrid(gridSize);
}

// Function to create the grid with the specified size
function createGrid(size) {
  // Clear the existing grid
  var grid = document.querySelector('#grid');
  grid.innerHTML = '';

  // Create the table rows and cells
  for (var i = 0; i < size; i++) {
    var row = document.createElement('tr');
    for (var j = 0; j < size; j++) {
      var cell = document.createElement('td');
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}


document.getElementById("fill-button").addEventListener("click", function() {
  currentAction = "JdT";
});

// Function to check if a selected cell is valid
function isValidSelection(selectedCellCoords, clickedCells) {

  //check if the cell hasn't been selected before and if it has returns false
  if (includes(clickedCells, selectedCellCoords)) {
    return false;
  }

  //check if the cell is the top left one
  if (JSON.stringify(selectedCellCoords) == JSON.stringify([0, 0])) {
    return true;
  }

  var cellUp = [selectedCellCoords[0], selectedCellCoords[1] - 1];
  var cellLeft = [selectedCellCoords[0] - 1, selectedCellCoords[1]];

  //check if the cell is either at the top side or right below a cell in clickedCells
  //simultaneously chekcs if the cell is either at the left edge or right to the right of a cell in clickedCells 
  if ((includes(clickedCells, cellUp) || cellUp[1] < 0) && (includes(clickedCells, cellLeft) || cellLeft[0] < 0)) {
    return true;
  }
  return false;
}


// function to chekc if the array of arrays a includes the array b
function includes(a, b) {
  for (var i = 0; i < a.length; i++) {
    if (JSON.stringify(a[i]) == JSON.stringify(b)) {
      return true;
    }
  }
  return false;
}



// Define a function to print the variable value on the webpage
function printTableau() {
    // Get a reference to the HTML element where the variable value should be printed
    var outputElement = document.getElementById('outputTableau');

    // Set the variable value as the content of the output element
    outputElement.innerHTML = JSON.stringify(clickedCells);
}
