const CONTAINER = document.getElementById("container");
const SLIDER = document.getElementById("slider");
const SLIDERVALUESPAN = document.getElementById("sliderValue")
const RANDOMCOLORBUTTON = document.getElementById("randomColorBtn")
let divsPerSide = 10;
let numberOfDivs = 100;
let divSize = 72;
let divs;
let randomColorOn = false;



let switchRandomColor = function(){
    randomColorOn = !randomColorOn
    console.log(`Switched random color to ${randomColorOn}`);
}

let changeSliderValue = function(){
    SLIDERVALUESPAN.textContent = SLIDER.value;
    divsPerSide = SLIDER.value;
    numberOfDivs = divsPerSide * divsPerSide;
    divSize = 720/SLIDER.value
    console.log(numberOfDivs);
    deleteCanvas()
    createCanvas()
}

let createCanvas = function(){
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
let deleteCanvas = function (){
    divs.forEach(node => {
        CONTAINER.removeChild(node)
    });
}

let draw = function(){
    divs.forEach(element => {
        let mouseDown = true;
        function startDrawing() {
            if (mouseDown === true) {
                if (randomColorOn === false) {
                    this.classList.add("black")
                } else{
                    let rngColor1 = Math.floor(Math.random()*1000000)
                    this.style.backgroundColor = `#${rngColor1}`
                    console.log(this.style.backgroundColor);
                }
            }
        }
        function isMouseDown(e) {
            mouseDown = true
            element.classList.add("black")
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