// Get a reference to the canvas element
var canvas = document.querySelector('#drawing-canvas');

// Get the 2D drawing context of the canvas
var context = canvas.getContext('2d');

// Set the line width and color for the drawing
context.lineWidth = 5;
context.strokeStyle = '#333';

// Variables to keep track of the current drawing state
var isDrawing = false;
var lastX = 0;
var lastY = 0;

// Add event listeners to handle the drawing
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Function to start drawing when the mouse is pressed
function startDrawing(event) {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
}

// Function to draw a line segment when the mouse is moved
function draw(event) {
    if (!isDrawing) return;

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();

    lastX = event.offsetX;
    lastY = event.offsetY;
}

// Function to stop drawing when the mouse is released or leaves the canvas
function stopDrawing() {
    isDrawing = false;
}