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
        createNSquaresAndAppendToContainer(3);
    } else if(retrieveSelected() == "hard"){
        createNSquaresAndAppendToContainer(6);
    }
    styleGridRandomRGB();
    updateRestartTextPlaying();
}

function retrieveSelected() {
    var selected = document.querySelector(".selected");
    return selected.id;
}

function createNSquaresAndAppendToContainer(num) {
    var container = document.querySelector("#container");
    for(let i = 0; i < num; i++){
        container.appendChild(getNewSquare());
    }
}

function getNewSquare() {
    var square = document.createElement("div");
    square.classList.add("square");
    return square;
}

function removeAllSquares() {
    var squares = getAllSquares();
    for(let i = 0; i < squares.length; i++){
        squares[i].parentNode.removeChild(squares[i]);
    }
}

/* Color Update*/

function styleGridRandomRGB() {
    var squares = getAllSquares();

    for (let i = 0; i < squares.length; i++) {
        styleSquareRandomRGB(squares[i]);
    }
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
    var squares = getAllSquares();
    var chosenSquare = randomInt(0, squares.length - 1);
    return squares[chosenSquare].style.backgroundColor;
}

/* Common query functions */

function getAllSquares(){
    return document.querySelectorAll(".square");
}

/* Update elements */
function updateHeaderToDefaultColor(){
    var query = document.querySelector("#header");
    query.style.backgroundColor = "#3C76AE";
}

function getMessageElement(){
    return document.querySelector("#message");
}

function updateRightFeedbackMessage(){
    var feedbackMessage = getMessageElement();
    feedbackMessage.textContent = "Correct!";
    feedbackMessage.style.color = "#65ED95";
}

function updateWrongFeedbackMessage(){
    var feedbackMessage = getMessageElement();
    feedbackMessage.textContent = "Try again...";
    feedbackMessage.style.color = "red";
}

function updateClearFeedbackMessage(){
    var feedbackMessage = getMessageElement();
    feedbackMessage.textContent = " ";
}

function updateAllElementsBackgroundColor(color){
    var allElements = document.querySelectorAll(".square, #header");
    for(let i = 0; i < allElements.length; i++){
        styleSquarePassedRGB(allElements[i], color);
    }
}

function getRestartElement(){
    return document.querySelector("#restart");
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
    var squares = getAllSquares();

    for(let i = 0; i < squares.length; i++){
        squares[i].removeEventListener('click', squares[i].eventObject);
    }
}

function addAllSquareEventListeners(correctColor){
    let squares = getAllSquares();

    for(let i = 0; i < squares.length; i++){
        squares[i].addEventListener(
            'click', squares[i].eventObject = checkSquareColor.bind(squares[i], correctColor));
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
    let restartButton = document.querySelector("#restart");
    restartButton.addEventListener('click', restartGame);

    let easyButton = document.querySelector("#easy");
    easyButton.addEventListener('click', easyGame);
    
    let hardButton = document.querySelector("#hard");
    hardButton.addEventListener('click', hardGame);
}

function restartGame(){
    removeAllSquareEventListeners();
    removeAllSquares();
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
    updateHeaderToDefaultColor();
    updateClearFeedbackMessage();
    recreateGridAfterChange(); 
    var mainColor = chooseMainColor();
    var colorDisplay = document.querySelector("#colorDisplay");
    colorDisplay.textContent = mainColor;
    addAllSquareEventListeners(mainColor);
}

addButtonListeners();
startGame();