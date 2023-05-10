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

function clearSketchPad() {
    const gridContainer = document.querySelector(".grid-container");
    const bgColor = getComputedStyle(gridContainer).backgroundColor;
    const gridFieldNodeList = document.querySelectorAll(".grid-field");
    gridFieldNodeList.forEach(gridField => {
        gridField.style.backgroundColor = bgColor;
        gridField.style.opacity = 1;
    });
}

function generateRandNumBetw0And255() {
    return Math.floor(Math.random() * 256);
}

function generateRandRGBColor() {
    const r = generateRandNumBetw0And255();
    const g = generateRandNumBetw0And255();
    const b = generateRandNumBetw0And255();
    return `rgb(${r},${g},${b})`;
}

function makeShadow(gridField) {
    const styleOfGridField = getComputedStyle(gridField);
    let opacityOfGridField = Number(styleOfGridField.opacity);
    if (opacityOfGridField === 1) {
        gridField.style.opacity = 0.1;
    } else {
        gridField.style.opacity = opacityOfGridField + 0.1;
    }
}

function addBackgroundColor(gridField, selectedColorClass) {
    if (selectedColorClass === "black-color") {
        gridField.style.backgroundColor = "black";
        gridField.style.opacity = 1;
    } else if (selectedColorClass === "shadow-color") {
        makeShadow(gridField);
        gridField.style.backgroundColor = "black";
    } else if (selectedColorClass === "rainbow-color") {
        gridField.style.backgroundColor = generateRandRGBColor();
        gridField.style.opacity = 1;
    } else if (selectedColorClass === "eraser-color") {
        const gridContainer = document.querySelector(".grid-container");
        const bgColor = getComputedStyle(gridContainer).backgroundColor;
        gridField.style.backgroundColor = bgColor;
        gridField.style.opacity = 1;
    }
}

function getColorClass() {
    return document.querySelector(".button-clicked").getAttribute("data-key");
}

function paintSketchPad(gridField) {
    const selectedColorClass = getColorClass();
    addBackgroundColor(gridField, selectedColorClass);
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


