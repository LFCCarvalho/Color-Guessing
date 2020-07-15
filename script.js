function gameInit() {
    buildGame();
    addButtonListeners();
}

gameInit();

function buildGame() {
    createAndStyleGrid();
    updatePageTextAndColorsToDefault();

    let mainColor = chooseMainColor();
    updateColorDisplayText(mainColor);
    addAllSquareEventListeners(mainColor);
}

/* Start grid creation and styling */
function createAndStyleGrid() {
    if (retrieveSelected() == "easy") {
        createNSquaresAndAppendToContainer(3);
    } else if (retrieveSelected() == "hard") {
        createNSquaresAndAppendToContainer(6);
    }
    styleGridRandomRGB();
}

function retrieveSelected() {
    let selected = document.querySelector(".selected");
    return selected.id;
}

function createNSquaresAndAppendToContainer(num) {
    let container = document.querySelector("#container");
    for (let i = 0; i < num; i++) {
        container.appendChild(getNewSquare());
    }
}

function getNewSquare() {
    let square = document.createElement("div");
    square.classList.add("square");
    return square;
}

function styleGridRandomRGB() {
    let squares = getAllSquares();

    for (let i = 0; i < squares.length; i++) {
        styleSquareRandomRGB(squares[i]);
    }
}

function styleSquareRandomRGB(domElement) {
    let colors = generateRandomRGB();
    domElement.style.backgroundColor = 'rgb(' + colors.red + ', ' + colors.blue + ', ' + colors.green + ')';
}

function generateRandomRGB() {
    let color = {};
    color.red = randomInt(0, 255);
    color.blue = randomInt(0, 255);
    color.green = randomInt(0, 255);

    return color;
}

function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
}
/* End grid creation and styling */

/* Start update page and text colors to default */
function updatePageTextAndColorsToDefault() {
    updateHeaderToDefaultColor();
    updateClearFeedbackMessage();
    updateRestartTextPlaying();
}

function updateHeaderToDefaultColor() {
    let query = document.querySelector("#header");
    query.style.backgroundColor = "#3C76AE";
}

function updateClearFeedbackMessage() {
    let feedbackMessage = getMessageElement();
    feedbackMessage.textContent = " ";
}

function getMessageElement() {
    return document.querySelector("#message");
}

function updateRestartTextPlaying() {
    let query = getRestartElement();
    query.textContent = "New colors";
}

function getRestartElement() {
    return document.querySelector("#restart");
}
/* End update page and text colors to default */

/* Start choose main color*/
function chooseMainColor() {
    let squares = getAllSquares();
    let chosenSquare = randomInt(0, squares.length - 1);
    return squares[chosenSquare].style.backgroundColor;
}

function getAllSquares() {
    return document.querySelectorAll(".square");
}
/* End choose main color */

/* Start update color display text */
function updateColorDisplayText(mainColor) {
    let colorDisplay = getColorDisplay();
    colorDisplay.textContent = mainColor;
}

function getColorDisplay() {
    return document.querySelector("#colorDisplay");
}
/* End update color display text */

/* Start add all square event listeners*/
function addAllSquareEventListeners(correctColor) {
    let squares = getAllSquares();

    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener(
            // The bind function recreate the listener, so eventObject property is necessary if you 
            // want to remove the listener later
            'click', squares[i].eventObject = checkSquareColor.bind(squares[i], correctColor));
    }
}

function checkSquareColor(correctColor) {
    if (correctColor == this.style.backgroundColor) {
        updateAndFinishGame(correctColor);
    } else {
        updateAndContinueGame(this);
    }
}
// Start update and finish game
function updateAndFinishGame(correctColor) {
    updateRightFeedbackMessage();
    updateAllElementsBackgroundColor(correctColor);
    updateRestartTextFinished();
}

function updateRightFeedbackMessage() {
    let feedbackMessage = getMessageElement();
    feedbackMessage.textContent = "Correct!";
    feedbackMessage.style.color = "#65ED95";
}

function updateAllElementsBackgroundColor(color) {
    let allElements = document.querySelectorAll(".square, #header");
    for (let i = 0; i < allElements.length; i++) {
        styleSquarePassedRGB(allElements[i], color);
    }
}

function styleSquarePassedRGB(element, color) {
    element.style.backgroundColor = color;
}

function updateRestartTextFinished() {
    let query = getRestartElement();
    query.textContent = "Play again?"
}
// End update and finish game

// Start update and continue game
function updateAndContinueGame(wrongElement) {
    styleSquareDefaultRGB(wrongElement);
    updateWrongFeedbackMessage();
};

function styleSquareDefaultRGB(element) {
    element.style.backgroundColor = "#232323";
}

function updateWrongFeedbackMessage() {
    let feedbackMessage = getMessageElement();
    feedbackMessage.textContent = "Try again...";
    feedbackMessage.style.color = "red";
}
// End update and continue game

/* End add all square event listeners */

/* Start add button listeners */
function addButtonListeners() {
    let easyButton = document.querySelector("#easy");
    easyButton.addEventListener('click', easyGame);

    let hardButton = document.querySelector("#hard");
    hardButton.addEventListener('click', hardGame);

    let restartButton = document.querySelector("#restart");
    restartButton.addEventListener('click', restartGame);
}

function easyGame() {
    if (retrieveSelected() == "hard") {
        toggleSelected();
        restartGame();
    }
}

function hardGame() {
    if (retrieveSelected() == "easy") {
        toggleSelected();
        restartGame();
    }
}

function toggleSelected() {
    let toChange = document.querySelectorAll(".mode");
    toChange.forEach(function (element) {
        element.classList.toggle("selected");
    });
}

function restartGame() {
    removeAllSquareEventListeners();
    removeAllSquares();
    buildGame();
}

function removeAllSquareEventListeners() {
    let squares = getAllSquares();
    for (let i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('click', squares[i].eventObject);
    }
}

function removeAllSquares() {
    let squares = getAllSquares();
    for (let i = 0; i < squares.length; i++) {
        squares[i].parentNode.removeChild(squares[i]);
    }
}

/* End add button listeners */