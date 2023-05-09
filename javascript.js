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

function paintSketchPad(event) {
    /* const color = getColor(); */
    event.addEventListener("mouseover",
        (event) => {
            event.target.style.backgroundColor = "black";
            /* event.target.classList.add("black-color"); */
        });
}

function addListenerToGridFields() {
    const gridFieldNodeList = document.querySelectorAll(".grid-field");
    gridFieldNodeList.forEach(gridField => paintSketchPad(gridField));

}

function addListenerToButton() {
    const colorButtonNodeList = document.querySelectorAll(".color-button");
    colorButtonNodeList.forEach((colorButton) => {
        colorButton.addEventListener("click", (event) =>
            handleButtonClick(event, colorButton, colorButtonNodeList))
    })
}

function handleButtonClick(event, colorButton, colorButtonNodeList) {
    const color = colorButton.getAttribute('data-key');
    
    colorButtonNodeList.forEach(element => {
        if (element == colorButton) {
            colorButton.classList.add("button-clicked");
        } else {
            element.classList.remove("button-clicked");
        }
    })
}

function selectButton(event) {
    event.target.style.backgroundColor = "grey";
}

const numberOfGrids = 16;
createSketchPad(numberOfGrids);
/* selectButton(".black-button"); */
addListenerToGridFields();
addListenerToButton();


