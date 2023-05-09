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

function addListenerToGridFields() {
    const gridFieldNodeList = document.querySelectorAll(".grid-field");
    gridFieldNodeList.forEach(gridField => {
        gridField.addEventListener("mouseover", (event) => paintSketchPad('black', event))
    });

}

function paintSketchPad(color, event) {
    event.target.style.backgroundColor = color;
}

const numberOfGrids = 16;
createSketchPad(numberOfGrids);
addListenerToGridFields();


