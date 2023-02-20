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

function displayQuestions(apiIndexQues) {
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
}

//next Button
function nextButton() {
  apiIndexQues++;
  displayQuestions(apiIndexQues);
  checkedAnswers(apiIndexQues);
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

var next = document.getElementById("btn");
next.addEventListener("click", nextButton);

// previous Button
function previousButton() {
  console.log(apiIndexQues);
  apiIndexQues--;
  displayQuestions(apiIndexQues);
  checkedAnswers(apiIndexQues);
}
var previous = document.getElementById("btn2");
previous.addEventListener("click", previousButton);
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
  const radioButton = document.getElementsByName("answer");
  radioButton.forEach((a, b) => {
    if (a.checked) {
      if (incorrectAns[b] === correctAnswer) {
        alert("This is right answer");
      } else {
        alert("wrong answer");
      }
    }
  });
}
const checkAnswerBtn = document.getElementById("btn1");
checkAnswerBtn.addEventListener("click", checkAnswer);

let apiUrl = `https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple`;

axios.get(apiUrl).then(saveResponse);

function saveResponse(response) {
  all_json_data = response.data.results;
  console.log(all_json_data);
  displayQuestions(apiIndexQues);
}
