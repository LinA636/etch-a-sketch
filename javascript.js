/* functions */
function deleteGridField() {
    const gridContainer = document.querySelector(".grid-container");
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

function calcGridFieldWidth(numberOfGrids) {
    const widthGridContainer = document.querySelector(".grid-container").clientWidth;
    totalGridFieldBoarderWidth = numberOfGrids * 2;
    return ((widthGridContainer - totalGridFieldBoarderWidth) / numberOfGrids);
}

function createSketchPad(numberOfGrids) {
    const gridContainer = document.querySelector(".grid-container");
    widthGridField = calcGridFieldWidth(numberOfGrids);
    for (let i = 0; i < numberOfGrids; i++) {
        for (let j = 0; j < numberOfGrids; j++) {
            const gridField = document.createElement("div");
            gridField.classList.add("grid-field");
            gridField.style.width = widthGridField + "px";
            gridField.style.height = widthGridField + "px";
            gridContainer.appendChild(gridField);
        }
    }
}

function checkInputNumber(inputNumber) {
    return 16 <= inputNumber && inputNumber <= 50;
}

function handleInputNumber() {
    const inputNumberContainer = document.querySelector(".cb-grid-number-input");
    let inputNumber = inputNumberContainer.value;
    if (!checkInputNumber(inputNumber)) {
        inputNumberContainer.value = 16;
        inputNumber = 16;
    }
    deleteGridField();
    createSketchPad(inputNumber);
    addListenerToGridFields();
}

function getColorClass(){
    return document.querySelector(".button-clicked").getAttribute("data-key");
}

function manipulateColorClasses(gridField, selectedColorClass){
    const colorButtonNodeList = document.querySelectorAll(".color-button");
    colorButtonNodeList.forEach((colorButton) => {
        const colorClass = colorButton.getAttribute("data-key");
        if(colorClass === selectedColorClass){
            gridField.classList.add(selectedColorClass);
        } else {
            gridField.classList.remove(colorClass);
        }
    });
}

function paintSketchPad(gridField) {
    const selectedColorClass = getColorClass();
    manipulateColorClasses(gridField, selectedColorClass);
    
}

function addListenerToGridFields() {
    const gridFieldNodeList = document.querySelectorAll(".grid-field");
    gridFieldNodeList.forEach(gridField => {
        gridField.addEventListener("mouseover", (event) => {
            paintSketchPad(gridField);
        });
    });
}

function handleButtonClick(colorButton, colorButtonNodeList) {
    colorButtonNodeList.forEach(element => {
        if (element == colorButton) {
            colorButton.classList.add("button-clicked");
        } else {
            element.classList.remove("button-clicked");
        }
    })
}

function addListenerToButton() {
    const colorButtonNodeList = document.querySelectorAll(".color-button");
    colorButtonNodeList.forEach((colorButton) => {
        colorButton.addEventListener("click", (event) =>
            handleButtonClick(colorButton, colorButtonNodeList))
    })
}

/* execute code */
/* default settings */
const numberOfGrids = 16;
createSketchPad(numberOfGrids);
addListenerToGridFields();
addListenerToButton();


