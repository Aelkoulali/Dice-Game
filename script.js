// Set the HTML variables
const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.querySelector("#current-round");
const rollsElement = document.querySelector("#current-round-rolls");
const totalScoreElement = document.querySelector("#total-score");
const scoreHistory = document.querySelector("#score-history");
const rollDiceBtn = document.querySelector("#roll-dice-btn");
const keepScoreBtn = document.querySelector("#keep-score-btn");
const rulesBtn = document.querySelector("#rules-btn");
const rulesContainer = document.querySelector(".rules-container");
// Track the state of the game rules
let isModalShowing = false; 
// Track of all of the dice values
let diceValuesArr = []; 
// Declare starting values
let rolls = 0;
let score = 0;
let round = 1;

// Add addEventListener to rulesBtn
rulesBtn.addEventListener("click", () => {
    isModalShowing = !isModalShowing; // convert to true
    if (!isModalShowing) {
        rulesBtn.textContent = "Show rules";
        rulesContainer.style.display = "none";
        } else {
        rulesBtn.textContent = "Hide rules";
        rulesContainer.style.display = "block";
        }
})

// Add addEventListener to rollDiceBtn
rollDiceBtn.addEventListener("click", () => {
    let count = 0;
    diceValuesArr = [];
    while (diceValuesArr.length < 5){
      let random = Math.ceil((Math.random() * 6)); // generates 5 random numbers between 1 and 6 inclusive
      diceValuesArr.push(random); // Push those numbers to the array
      listOfAllDice[count].textContent = random; // display those numbers in listOfAllDice elements
      count++
    }
})

// Display alert when the dice is rolled 3 times
rollDiceBtn.addEventListener("click", () => {
  if(rolls === 3){
    alert("You have made three rolls, Please select a score");
  } else {
    rolls++
    rollDice();
  }  
});