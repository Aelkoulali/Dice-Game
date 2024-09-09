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

// Add Function rollDice
const rollDice = () => {
    diceValuesArr = [];
  
    for (let i = 0; i < 5; i++) {
      const randomDice = Math.floor(Math.random() * 6) + 1; // Generates 5 random numbers between 1 and 6 inclusive
      diceValuesArr.push(randomDice); // Push those numbers to the array
    };
  
    listOfAllDice.forEach((dice, index) => {
      dice.textContent = diceValuesArr[index]; // display those numbers in listOfAllDice elements 
    });
};

// Add updateRadioOption function
const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `, score = ${score}`;
}

// Function that update round and rolls
const updateStats = () => {
    rollsElement.textContent = rolls; // Update rolls text
    roundElement.textContent = round; // Update round text
};

// Create updateScore function (user selected value, score achieved)
const updateScore = (selectedValue, achieved) => {
  score += parseInt(selectedValue); 
  totalScoreElement.textContent = score;
  scoreHistory.innerHTML = `<li>${achieved} : ${selectedValue}</li>`; // Add  new element li
} 

// Function that count how many times each number is found in the array  
const getHighestDuplicates = (arr) => {
  let sum = arr.reduce((acc, currVal) => acc + currVal, 0); //score = sum of all five dice values
  let duplicates = {};
  arr.forEach((num) => {
    duplicates[num] ? (duplicates[num] += 1) : (duplicates[num] = 1);
  });
  // Update radio option index & score 
  for (const num in duplicates) {
    if (duplicates[num] >= 4) {
      updateRadioOption(1, sum);
      updateRadioOption(0, sum);
    } else if (duplicates[num] === 3) {
      updateRadioOption(0, sum);
    } else {
      updateRadioOption(5, 0);
    }
  }
};

// Create resetRadioOptions function, call this function before you roll the dice
const resetRadioOptions = () => {
  scoreInputs.forEach((i)=> {
    i.disabled = true;
    i.checked = false;
  })
    scoreSpans.forEach((s) => {
    s.textContent = '';
  });

};

// Create a resetGame function
const resetGame = () => {
  listOfAllDice.forEach((die) => {
    die.textContent = "0"; // Reset all of the listOfAllDice elements to display 0
  });
  diceValuesArr = [0, 0, 0, 0, 0];
  score = 0;
  rolls = 0;
  round = 1;
  totalScore.textContent = "0";
  scoreHistory.textContent = "";
  currentRound.textContent = round;
};

// Add addEventListener to rollDiceBtn
rollDiceBtn.addEventListener("click", () => {
  if(rolls === 3){
    alert("You have made three rolls this round, Please select a score");
  } else {
    rolls++
    rollDice();
    updateStats();
    getHighestDuplicates(diceValuesArr);
    resetRadioOptions();
  };
   
});

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

// Add addEventListener to keepScoreBtn
keepScoreBtn.addEventListener("click", () => {
  let selectedValue;
  let achieved;
  for(const input of scoreInputs){
    if(input.checked){
      selectedValue = input.value;
      achieved = input.id;
      break;
    }
    if (selectedValue) {
      rolls = 0;
      round++;
      updateStats();
      resetRadioOptions();
      updateScore(selectedValue, achieved);
    } 
    if (round > 6) {
      setTimeout(alert("Final score"), 500);
      resetGame();
    } else {
      alert("Please select an option or roll the dice");
    }
  }
  
});

