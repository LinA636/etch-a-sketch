function createSketchPad(numberOfGrids) {
    const gridContainer = document.querySelector(".grid-container");
    widthGridField = calcGridFieldWidth(numberOfGrids);
    for (let i = 0; i < numberOfGrids; i++) {
        for (let j=0; j < numberOfGrids; j++){
            const gridField = document.createElement("div");
            gridField.classList.add("grid-field");
            gridField.style.width = widthGridField + "px";
            gridField.style.height = widthGridField + "px";
            gridContainer.appendChild(gridField);
        }
    }
}

function calcGridFieldWidth(numberOfGrids){
    const widthGridContainer = document.querySelector(".grid-container").clientWidth;
    totalGridFieldBoarderWidth = numberOfGrids*2;
    return ((widthGridContainer-totalGridFieldBoarderWidth)/numberOfGrids);
}

const numberOfGrids = 16;
createSketchPad(numberOfGrids);