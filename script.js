/* Mode difficulty */
function changeSelected() {
    var toChange = document.querySelectorAll(".mode");
    toChange.forEach(function (element) {
        element.classList.toggle("selected");
    });
    recreateGridAfterChange();
}

function recreateGridAfterChange() {
    if (retrieveSelected() == "easy") {
        hideSecondLine();
    } else {
        showSecondLine();
    }
    styleGridRandomRGB();
    updateRestartTextPlaying();
}

function retrieveSelected() {
    var selected = document.querySelector(".selected");
    return selected.id;
}

function hideSecondLine() {
    var bothLines = document.querySelectorAll(".square");
    bothLines.forEach(function (element, i) {
        if (i >= 3) { //3 elements per line
            hideSquare(element);
        }
    });
}

function hideSquare(square) {
    square.style.display = "none";
}

function showSecondLine() {
    var bothLines = document.querySelectorAll(".square");
    bothLines.forEach(function (element, i) {
        if (i >= 3) { //3 elements per line
            showSquare(element);
        }
    });
}

function showSquare(square) {
    square.style.display = "block";
}

/* Color Update*/

function styleGridRandomRGB() {
    var squares = document.querySelectorAll(".square");
    var displayedSquares = getDisplayedElements(squares);

    for (let i = 0; i < displayedSquares.length; i++) {
        styleSquareRandomRGB(displayedSquares[i]);
    }
}

function getDisplayedElements(js_nodeList) {
    var filtered = [].filter.call(js_nodeList, function (domElement) {
        var style = window.getComputedStyle(domElement);
        return (style.display != 'none');
    });
    return filtered;
}

function styleSquareRandomRGB(domElement) {
    var colors = generateRandomRGB();
    domElement.style.backgroundColor = 'rgb(' + colors.red + ', ' + colors.blue + ', ' + colors.green + ')';
}

function generateRandomRGB() {
    var color = {};
    color.red = randomInt(0, 255);
    color.blue = randomInt(0, 255);
    color.green = randomInt(0, 255);

    return color;
}

function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
}

function styleSquarePassedRGB(element, color){
    element.style.backgroundColor = color;
}

function styleSquareDefaultRGB(element) {
    element.style.backgroundColor = "#232323";
}

/* Color Picking */
function chooseMainColor() {
    var desiredElements = document.querySelectorAll(".square");
    var displayedElements = getDisplayedElements(desiredElements);
    var chosenSquare = randomInt(0, displayedElements.length - 1);
    return displayedElements[chosenSquare].style.backgroundColor;
}

/* Update elements */

function updateRightFeedbackMessage(){
    var feedbackMessage = document.querySelector("#message");
    feedbackMessage.textContent = "Correct!";
    feedbackMessage.style.color = "#65ED95";
}

function updateWrongFeedbackMessage(){
    var feedbackMessage = document.querySelector("#message");
    feedbackMessage.textContent = "Try again...";
    feedbackMessage.style.color = "red";
}

function updateClearFeedbackMessage(){
    var feedbackMessage = document.querySelector("#message");
    feedbackMessage.textContent = "";
}

function updateAllElementsBackgroundColor(color){
    var query = document.querySelectorAll(".square, #header");
    var displayedElements = getDisplayedElements(query);
    for(let i = 0; i < displayedElements.length; i++){
        styleSquarePassedRGB(displayedElements[i], color);
    }
}

function updateRestartTextPlaying() {
    var query = document.querySelector("#restart");
    query.textContent = "New colors";
}

function updateRestartTextFinished() {
    var query = document.querySelector("#restart");
    query.textContent = "Play again?"
}

/* Event Listeners */
function removeAllSquareEventListeners(){
    var desiredElements = document.querySelectorAll(".square");
    var displayedSquares = getDisplayedElements(desiredElements);

    for(let i = 0; i < displayedSquares.length; i++){
        displayedSquares[i].removeEventListener('click', displayedSquares[i].eventObject);
    }
}

function addAllSquareEventListeners(correctColor){
    var desiredElements = document.querySelectorAll(".square");
    var displayedSquares = getDisplayedElements(desiredElements);

    for(let i = 0; i < displayedSquares.length; i++){
        displayedSquares[i].addEventListener('click', 
                                            displayedSquares[i].eventObject = checkSquareColor.bind(displayedSquares[i], correctColor));
    }
}

function checkSquareColor(correctColor){
    if(correctColor == this.style.backgroundColor) {
       updateAndFinishGame(correctColor);
    } else{
        updateAndContinueGame(this);
    }
}

function addButtonListeners(){
    var restartButton = document.querySelector("#restart");
    restartButton.addEventListener('click', restartGame);

    var easyButton = document.querySelector("#easy");
    easyButton.addEventListener('click', easyGame);
    
    var hardButton = document.querySelector("#hard");
    hardButton.addEventListener('click', hardGame);
}

function restartGame(){
    removeAllSquareEventListeners();
    startGame();
}

function easyGame(){
    if(retrieveSelected() == "hard"){
        changeSelected();
        restartGame();
    }
}

function hardGame(){
    if(retrieveSelected() == "easy"){
        changeSelected();
        restartGame();
    }
}

function restartGame(){
    removeAllSquareEventListeners();
    startGame();
}

/* Control flow */
function updateAndFinishGame(correctColor){
    updateRightFeedbackMessage();
    updateAllElementsBackgroundColor(correctColor);
    updateRestartTextFinished();
}

function updateAndContinueGame(wrongElement){
    styleSquareDefaultRGB(wrongElement);
    updateWrongFeedbackMessage();
};

function startGame(){
    updateClearFeedbackMessage();
    recreateGridAfterChange(); 
    var mainColor = chooseMainColor();
    var colorDisplay = document.querySelector("#colorDisplay");
    colorDisplay.textContent = mainColor;
    addAllSquareEventListeners(mainColor);
}

addButtonListeners();
startGame();