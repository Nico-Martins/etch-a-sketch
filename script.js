/*Checking whether left click is being held down*/
let mouseIsDown = false;
document.addEventListener("mousedown", function() { 
    mouseIsDown = true;
});
document.addEventListener("mouseup", function() { 
    mouseIsDown = false;
});

/*Managing active event listeners*/
let blackIsToggled = false;
let rainbowIsToggled = false;
let eraserIsToggled = false;
let brushIsToggled = false;
let bucketIsToggled = false;
let darkenIsToggled = false;
let lightenIsToggled = false;

function removeAllEventListeners(){
    let spansArr = Array.from(spans);
    switch (true){
        case blackIsToggled === true: 
            for (let i = 0; i < spansArr.length; i++){
                spansArr[i].removeEventListener("mouseover", paintBlack);
            }
            blackIsToggled = false;
            break;
        case rainbowIsToggled === true: 
            for (let i = 0; i < spansArr.length; i++){
                spansArr[i].removeEventListener("mouseover", paintRainbow);
            }
            rainbowIsToggled = false;
            break;
        case eraserIsToggled === true: 
            for (let i = 0; i < spansArr.length; i++){
                spansArr[i].removeEventListener("mouseover", erase);
            }
            eraserIsToggled = false;
            break;
        case brushIsToggled === true: 
            for (let i = 0; i < spansArr.length; i++){
                spansArr[i].removeEventListener("mouseover", useBrush);
            }
            brushIsToggled = false;
            break;
        case bucketIsToggled === true: 
            for (let i = 0; i < spansArr.length; i++){
                spansArr[i].removeEventListener("click", useBucket);
            }
            bucketIsToggled = false;
            break;
        case darkenIsToggled === true: 
            for (let i = 0; i < spansArr.length; i++){
                spansArr[i].removeEventListener("mouseover", darkenColor);
            }
            darkenIsToggled = false;
            break;
        case lightenIsToggled === true: 
            for (let i = 0; i < spansArr.length; i++){
                spansArr[i].removeEventListener("mouseover", lightenColor);
            }
            lightenIsToggled = false;
            break;           
    }
}

/*Creating the grid-size slider*/
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("slider-value");
slider.addEventListener("input", function(){
    sliderValue.textContent = `Value: ${slider.value}`;
});

/*Creating the grid*/
let spans = document.querySelectorAll("span");
let drawingGrid = document.getElementById("drawing-grid");

    /*Loading the sarting 16 by 16 grid*/
drawingGrid.setAttribute("style", `grid-template-columns: repeat(16, 1fr); grid-template-rows: repeat((16, 1fr)`);

window.addEventListener("DOMContentLoaded", function(){
    sliderValue.textContent = `Value: 16`;
    drawingGrid.textContent = "";
    drawingGrid.setAttribute("style", `grid-template-columns: repeat(16, 1fr); grid-template-rows: repeat((16, 1fr)`);
    for (let i = 1; i <= 16*16; i++){
        drawingGrid.appendChild(document.createElement("span"));
    }
    spans = document.querySelectorAll("span");
    toggleGrid();
    setToWhite()
});

    /*Updating the grid in relation to the slider's value*/
slider.addEventListener("input", function(){
    drawingGrid.textContent = "";
    drawingGrid.setAttribute("style", `grid-template-columns: repeat(${slider.value}, 1fr); grid-template-rows: repeat((${slider.value}, 1fr)`);
    for (let i = 1; i <= slider.value*slider.value; i++){
        drawingGrid.appendChild(document.createElement("span"));
    }
    spans = document.querySelectorAll("span");
    toggleGrid();
    setToWhite()
});

/*Toggling the grid on or off*/
let toggleGridBtn = document.getElementById("toggle-grid-button");
toggleGridBtn.addEventListener("click", toggleGrid);

function toggleGrid(){
    let spansArr = Array.from(spans);
    for (let i = 0; i < spansArr.length; i++){
        spansArr[i].classList.toggle("grid-border");
    }
}

/*Painting black*/
let blackBtn = document.getElementById("black-button");
blackBtn.addEventListener("click", function(){
    removeAllEventListeners();
    let spansArr = Array.from(spans);
    blackIsToggled = true;
    for (let i = 0; i < spansArr.length; i++){
        spansArr[i].addEventListener("mouseover", paintBlack);
    }
});

function paintBlack(){
    if (mouseIsDown){
        this.setAttribute("style", "background-color: rgb(0, 0, 0);");
    }
}

/*Painting Rainbow*/
let rainbowBtn = document.getElementById("rainbow-button");
let colorChoice = ["rgb(255, 0, 0)",     //Red
                    "rgb(0, 255, 255)",  //Cyan
                    "rgb(255, 0, 255)",  //Magenta
                    "rgb(0, 255, 0)",    //Green
                    "rgb(255, 255, 0)",  //Yellow
                    "rgb(0, 0, 255)",    //Blue
                    "rgb(255, 0, 125)",  //Pink
                    "rgb(0, 255, 125)",  //Turquoise
                    "rgb(255, 125, 0)",  //Orange
                    "rgb(0, 125, 255)",  //Azure
                    "rgb(125, 0, 255)",  //Purple
                    "rgb(125, 255, 0)"]; //Chartreuse

rainbowBtn.addEventListener("click", function(){
    removeAllEventListeners();
    let spansArr = Array.from(spans);
    rainbowIsToggled = true;
    for (let i = 0; i < spansArr.length; i++){
        spansArr[i].addEventListener("mouseover", paintRainbow);
    }
});

function paintRainbow(){
    if (mouseIsDown){
        this.setAttribute("style", `background-color: ${colorChoice[selectRandomColor()]};`);
    }
}

function selectRandomColor(){
    return Math.floor((Math.random()*100) / (100/11)); //Returns an integer from 0 to 11
}

/*Picking a color*/
let colorPicker = document.getElementById("pick-a-color");

    /*Brush*/
let brush = document.getElementById("brush");
brush.addEventListener("click", function(){
    removeAllEventListeners();
    let spansArr = Array.from(spans);
    brushIsToggled = true;
    for (let i = 0; i < spansArr.length; i++){
        spansArr[i].addEventListener("mouseover", useBrush);
    }
});

function useBrush(){
    if (mouseIsDown){
        this.setAttribute("style", `background-color: ${colorPicker.value};`);
    }
}

/*Darkening a color*/
let darken = document.getElementById("darken");
darken.addEventListener("click", function(){
    removeAllEventListeners();
    let spansArr = Array.from(spans);
    darkenIsToggled = true;
    for (let i = 0; i < spansArr.length; i++){
        spansArr[i].addEventListener("mouseover", darkenColor);
    }
});

function darkenColor(){
    if (mouseIsDown){
        let currentColor = this.style.backgroundColor;
        this.setAttribute("style", `background-color: ${darkenRGB(currentColor)};`);
        console.log(`background-color: ${darkenRGB(currentColor)};`)
    }
}

function darkenRGB(color){
    let removedText = color.split("(")[1].split(")")[0];
    let rgbArray = removedText.split(",");
    for (let i = 0; i < rgbArray.length; i++){
        if (rgbArray[i] - 25.5 <= 0){
            rgbArray[i] = 0;
        } else {
            rgbArray[i] -= 25.5;
        }
    }
    console.log("rgb(" + rgbArray.join(", ") + ")");
    return "rgb(" + rgbArray.join(", ") + ")" 
}

/*Lightening a color*/
let lighten = document.getElementById("lighten");
lighten.addEventListener("click", function(){
    removeAllEventListeners();
    let spansArr = Array.from(spans);
    lightenIsToggled = true;
    for (let i = 0; i < spansArr.length; i++){
        spansArr[i].addEventListener("mouseover", lightenColor);
    }
});

function lightenColor(){
    if (mouseIsDown){
        let currentColor = this.style.backgroundColor;
        this.setAttribute("style", `background-color: ${lightenRGB(currentColor)};`);
        console.log(`background-color: ${lightenRGB(currentColor)};`)
    }
}

function lightenRGB(color){
    console.log(color);
    let removedText = color.split("(")[1].split(")")[0];
    let rgbArray = removedText.split(",");
    for (let i = 0; i < rgbArray.length; i++){
        rgbArray[i] = +rgbArray[i];
        if (rgbArray[i] + 25.5 >= 255){
            rgbArray[i] = 255;
        } else {
            rgbArray[i] += 25.5;
        }
    }
    console.log("rgb(" + rgbArray.join(", ") + ")");
    return "rgb(" + rgbArray.join(", ") + ")" 
}


/*Erasing*/
let eraser = document.getElementById("eraser");
eraser.addEventListener("click", function(){
    removeAllEventListeners
    let spansArr = Array.from(spans);
    eraserIsToggled = true;
    for (let i = 0; i < spansArr.length; i++){
        spansArr[i].addEventListener("mouseover", erase);
    }
});

function erase(){
    if (mouseIsDown){
        this.setAttribute("style", `background-color: rgb(255, 255, 255);`);
    }
}

/*Clearing*/
let clear = document.getElementById("clear");
clear.addEventListener("click", setToWhite);

function setToWhite(){
    let spansArr = Array.from(spans);
    for (let i = 0; i < spansArr.length; i++){
        spansArr[i].setAttribute("style", "background-color: rgb(255, 255, 255);");
    }
}
