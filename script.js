/*Creating the slider*/
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slider-value");
slider.addEventListener("input", function(){
    sliderValue.textContent = `Value: ${slider.value}`;
});

/*Starting the 16 by 16 grid*/
let drawingGrid = document.getElementById("drawing-grid");
drawingGrid.setAttribute("style", `grid-template-columns: repeat(16, 1fr); grid-template-rows: repeat((16, 1fr)`);

window.addEventListener("DOMContentLoaded", function(){
    sliderValue.textContent = `Value: 16`;
    drawingGrid.textContent = "";
    drawingGrid.setAttribute("style", `grid-template-columns: repeat(16, 1fr); grid-template-rows: repeat((16, 1fr)`);
    for (let i = 1; i <= 16*16; i++){
        drawingGrid.appendChild(document.createElement("span"));
    }
});

/*Creating the grid in relation to the slider's value*/
slider.addEventListener("input", function(){
    drawingGrid.textContent = "";
    drawingGrid.setAttribute("style", `grid-template-columns: repeat(${slider.value}, 1fr); grid-template-rows: repeat((${slider.value}, 1fr)`);
    for (let i = 1; i <= slider.value*slider.value; i++){
        drawingGrid.appendChild(document.createElement("span"));
    }
});

/*Creating buttons*/
let spans = document.querySelectorAll("span");
let spansArr = Array.from(spans)
/*
spansArr.forEach(span => {
    break;
});
*/


