function randomize(values) {
  let index = values.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (index != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * index);
    index--;

    // And swap it with the current element.
    [values[index], values[randomIndex]] = [values[randomIndex], values[index]];
  }

  return values;
}
var option;
var incorrectAns;
var correctAnswer;
var apiIndexQues = 0;
var totalQuestions;
var all_json_data;
var userSelection = [];
var showColor = false;

function changeColor() {
  if (showColor) {
    checkAnswer();
  }
}

function calculateScore() {
  showColor = true;
  var score = 0;
  for (let i = 0; i < all_json_data.length; i++) {
    if (all_json_data[i].correct_answer === userSelection[i]) {
      score++;
    }
  }
  var userScore = document.getElementById("score");
  userScore.innerHTML = `Score ${score} out of 10`;
}

function calculateScoreButtonVisibility(apiIndexQues) {
  const checkAnswerBtn = document.getElementById("btn1");
  checkAnswerBtn.addEventListener("click", calculateScore);

  if (apiIndexQues === 9) {
    checkAnswerBtn.style.visibility = "visible";
  } else {
    checkAnswerBtn.style.visibility = "hidden";
  }
}

function displayQuestions(apiIndexQues) {
  previousButtonVisibility(apiIndexQues);
  nextButtonVisibility(apiIndexQues);
  calculateScoreButtonVisibility(apiIndexQues);
  let displayQuesElement = document.getElementById("displayQues");
  option = document.querySelectorAll(".option");
  incorrectAns = [...all_json_data[apiIndexQues].incorrect_answers];
  correctAnswer = all_json_data[apiIndexQues].correct_answer;

  incorrectAns.push(correctAnswer);
  randomize(incorrectAns);

  displayQuesElement.innerHTML = all_json_data[apiIndexQues].question;
  for (let i = 0; i < incorrectAns.length; i++) {
    option[i].nextElementSibling.innerText = incorrectAns[i];
  }
  changeColor();
}

//next Button
function nextButton() {
  apiIndexQues++;
  displayQuestions(apiIndexQues);
  checkedAnswers(apiIndexQues);
}

function nextButtonVisibility(apiIndexQues) {
  var next = document.getElementById("btn");
  next.addEventListener("click", nextButton);

  if (apiIndexQues === 9) {
    next.style.visibility = "hidden";
  } else {
    next.style.visibility = "visible";
  }
}

function checkedAnswers(index) {
  var thisisUserSelectedValue = userSelection[index];
  if (thisisUserSelectedValue === undefined) {
    for (let i = 0; i < incorrectAns.length; i++) {
      option[i].checked = false;
    }
    return;
  }
  for (let i = 0; i < incorrectAns.length; i++) {
    if (incorrectAns[i] == thisisUserSelectedValue) {
      option[i].checked = true;
    }
  }
}

// previous Button
function previousButton() {
  console.log(apiIndexQues);
  apiIndexQues--;
  displayQuestions(apiIndexQues);
  checkedAnswers(apiIndexQues);
}

function previousButtonVisibility(apiIndexQues) {
  var previous = document.getElementById("btn2");
  previous.addEventListener("click", previousButton);

  if (apiIndexQues === 0) {
    previous.style.visibility = "hidden";
  } else {
    previous.style.visibility = "visible";
  }
}

// Radio Button
function userSelectedAnswer() {
  const radioButton = document.getElementsByName("answer");
  radioButton.forEach((a, b) => {
    if (a.checked) {
      userSelection[apiIndexQues] = incorrectAns[b];
    }
  });
}

const choiceText = document.getElementsByName("answer");
for (var i = 0; i < choiceText.length; i++) {
  choiceText[i].addEventListener("click", userSelectedAnswer);
}

function checkAnswer() {
  $("label").removeClass("incorrectChoice");
  $("label").removeClass("correctChoice");
  console.log(correctAnswer);
  const radioButton = document.getElementsByName("answer");
  radioButton.forEach((a, b) => {
    console.log(a);
    if (incorrectAns[b] === correctAnswer) {
      $("label[for=" + a.id + "]").addClass("correctChoice");
    } else {
      $("label[for=" + a.id + "]").addClass("incorrectChoice");
    }
  });
}

let apiUrl = `https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple`;

axios.get(apiUrl).then(saveResponse);

function saveResponse(response) {
  all_json_data = response.data.results;
  console.log(all_json_data);
  displayQuestions(apiIndexQues);
}
