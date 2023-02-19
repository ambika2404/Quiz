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
function displayQuestions(apiIndexQues) {
  let displayQuesElement = document.getElementById("displayQues");
  option = document.querySelectorAll(".option");
  incorrectAns = [...all_json_data[apiIndexQues].incorrect_answers];
  correctAnswer = all_json_data[apiIndexQues].correct_answer;

  incorrectAns.push(correctAnswer);
  console.log(incorrectAns);
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
}

var next = document.getElementById("btn");
next.addEventListener("click", nextButton);

// previous Button
function previousButton() {
  console.log(apiIndexQues);
  apiIndexQues--;
  displayQuestions(apiIndexQues);
}
var previous = document.getElementById("btn2");
previous.addEventListener("click", previousButton);
// Radio Button
function userSelectedAnswer(index) {
  let userSelectedIndex = index.target.value;
  userSelectedIndex = userSelectedIndex.slice(userSelectedIndex.length - 1) - 1;
  console.log(userSelectedIndex);
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
        alert("answer is correct");
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
