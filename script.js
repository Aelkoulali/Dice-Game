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

// Declare rollDice function
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

// Declare updateRadioOption function
const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `, score = ${score}`;
}

// Declare a function that update round and rolls
const updateStats = () => {
    rollsElement.textContent = rolls; // Update rolls text
    roundElement.textContent = round; // Update round text
};

// Declare updateScore function (user selected value, score achieved)
const updateScore = (selectedValue, achieved) => {
  score += parseInt(selectedValue); 
  totalScoreElement.textContent = score;
  scoreHistory.innerHTML = `<li>${achieved} : ${selectedValue}</li>`; // Add  new element li
} 

// Declare a function that count how many times each number is found in the array  
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

// Declare resetRadioOptions function, call this function before you roll the dice
const resetRadioOptions = () => {
  scoreInputs.forEach((i)=> {
    i.disabled = true;
    i.checked = false;
  })
    scoreSpans.forEach((s) => {
    s.textContent = '';
  });

};
// Declare detectFullHouse function 
/*
Full house = If the user rolls three of one number, and two of another number.
*/
const detectFullHouse = (arr) => {
  const counts = {};
  for (const num of arr) {
    if (counts[num]) {
      counts[num]++;
      } else {
        counts[num] =1;
      }
  }

  for (const num in counts) {
    if (counts[num] === 3 && counts[num] === 2) {
        updateRadioOption(2, 25); // Full house : updtae  the third button with a score = 25
        } else {
        updateRadioOption(5, 0); // Update the last button with a score = 0 
       }
  }
};

// Declare a resetGame function
const resetGame = () => {
  diceValuesArr = [0, 0, 0, 0, 0];
  score = 0;
  rolls = 0;
  round = 1;

  listOfAllDice.forEach((die) => { die.textContent = "0";}); // Reset all of the listOfAllDice elements to display 0
  totalScoreElement.textContent = score;
  scoreHistory.innerHTML = "";

  rollsElement.textContent = rolls;
  roundElement.textContent = round;

  resetRadioOptions();
};

// Declare checkForStraights function 
/*
A small straight = when four of the dice have consecutive values, Ex (1234) resulting in a score of 30 points.
A large straight = when all five dice have consecutive values in any order (Ex. 12345) resulting in a score of 40 points.
*/ 
const checkForStraights = (arr) => {
  arr.sort((a, b)=> a-b);
    let count = 0;
    for(let i = 0; i <= arr.length; i++){
      count++;
      if (count === 5) {
        updateRadioOption(3, 30); // small straight
        updateRadioOption(4, 40); // large straight
      } else if (count === 4) {
        updateRadioOption(3, 30); // small straight
      } else {
      updateRadioOption(5, 0); // no straight
    }
  }
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
    detectFullHouse(diceValuesArr);
    checkForStraights(diceValuesArr);
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

