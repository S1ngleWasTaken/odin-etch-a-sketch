const CONTAINER = document.getElementById("container");
const SLIDER = document.getElementById("slider");
const SLIDERVALUESPAN = document.getElementById("sliderValue")
const RANDOMCOLORBUTTON = document.getElementById("randomColorBtn")
const COLORINPUT = document.getElementById("colorInput")
console.log(COLORINPUT.value);

let divsPerSide = 10;
let numberOfDivs = 100;
let divSize = 72;
let divs;
let randomColorOn = false;
let redColor;
let greenColor;
let blueColor;


let switchRandomColor = function () {
    randomColorOn = !randomColorOn
    console.log(`Switched random color to ${randomColorOn}`);
}

let changeSliderValue = function () {
    SLIDERVALUESPAN.textContent = SLIDER.value;
    divsPerSide = SLIDER.value;
    numberOfDivs = divsPerSide * divsPerSide;
    divSize = 720 / SLIDER.value
    console.log(numberOfDivs);
    deleteCanvas()
    createCanvas()
}

let createCanvas = function () {
    for (let i = 0; i < numberOfDivs; i++) {
        let div = document.createElement("div");
        div.className = "blank";
        div.style.height = `${divSize}px`
        div.style.aspectRatio = "1";
        CONTAINER.appendChild(div)
    }
    divs = document.querySelectorAll(".blank")
    draw()

}

RANDOMCOLORBUTTON.addEventListener("click", switchRandomColor)
let deleteCanvas = function () {
    divs.forEach(node => {
        CONTAINER.removeChild(node)
    });
}

let draw = function () {
    divs.forEach(element => {
        let mouseDown = true;
        function generateRandomColor() {
            redColor = Math.floor(Math.random() * 257)
            greenColor = Math.floor(Math.random() * 257)
            blueColor = Math.floor(Math.random() * 257)
        }
        function startDrawing() {

            if (mouseDown === true) {
                if (randomColorOn === false) {
                    this.style.backgroundColor = COLORINPUT.value
                } else {
                    generateRandomColor()
                    this.style.backgroundColor = `rgb(${redColor},${greenColor},${blueColor})`
                }
            }
        }
        function isMouseDown(e) {
            mouseDown = true
            if (randomColorOn === false) {
                element.style.backgroundColor = COLORINPUT.value
            } else {
                element.style.backgroundColor = `rgb(${redColor},${greenColor},${blueColor})`
            }
            divs.forEach(element => {
                element.addEventListener("mouseenter", startDrawing)
            });
        }
        function stopDrawing() {
            mouseDown = false;
        }
        element.addEventListener("mousedown", isMouseDown)
        document.addEventListener("mouseup", stopDrawing)
    });
}
createCanvas();