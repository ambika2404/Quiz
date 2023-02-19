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

var totalQuestions;
function displayQuestions(response) {
  totalQuestions = response.data.results;
  console.log(totalQuestions);
  let displayQuesElement = document.getElementById("displayQues");
  option = document.querySelectorAll(".option");
  incorrectAns = response.data.results[0].incorrect_answers;
  correctAnswer = response.data.results[0].correct_answer;

  incorrectAns.push(correctAnswer);
  randomize(incorrectAns);

  displayQuesElement.innerHTML = response.data.results[0].question;
  for (let i = 0; i < incorrectAns.length; i++) {
    option[i].nextElementSibling.innerText = incorrectAns[i];
  }
  function nextButton() {}
  var next = document.getElementById("btn");
  next.addEventListener("click", nextButton);
}

// document.getElementById("choice3").checked = true;

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

axios.get(apiUrl).then(displayQuestions);
