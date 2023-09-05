let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let startSection = document.getElementById("start");
let displaySection = document.getElementById("middle");
let scoreSection = document.getElementById("finish");
let userScoreInattention = document.getElementById("user-score-inattention");
let userScoreImpulsivity = document.getElementById("user-score-impulsivity");
let progressScoreInattention = document.getElementById("progress-score-inattention");
let progressScoreImpulsivity = document.getElementById("progress-score-impulsivity");
let startButton = document.getElementById("start-button");
let name = document.getElementById("name");
let email = document.getElementById("email");
let progress = document.getElementById("progress");
let point = document.getElementById("point");
let questionCount;
let scoreInattention = 0;
let scoreImpulsivity = 0;
let arrayLength = quizArray.length

nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        questionCount += 1;
        nextBtn.classList.add('disabled');
        let maxScore = (arrayLength / 2) * 3;
        let passed = `${Math.round((questionCount + 1) / arrayLength * 100)}%`;
        if (questionCount === arrayLength) {
            displaySection.classList.add("hide");
            scoreSection.classList.remove("hide");
            let passedInattention = `${Math.round(Number(scoreInattention)/maxScore * 100)}%`;
            let passedImpulsivity = `${Math.round(Number(scoreImpulsivity)/maxScore * 100)}%`;
            userScoreInattention.innerHTML =
                scoreInattention + " из "+ maxScore + " баллов в разделе «Невнимательность»."
            userScoreImpulsivity.innerHTML =
                scoreImpulsivity + " из "+ maxScore + " баллов в разделе «Импульсивность / гиперактивность»."
            progressBarPassed(progressScoreInattention, passedInattention);
            progressBarPassed(progressScoreImpulsivity, passedImpulsivity);
            // sendMessageToDevs(name, email, scoreInattention, scoreImpulsivity, maxScore);

            let allScore = Math.round(((scoreInattention + scoreImpulsivity)/(2 * maxScore)) * 100);

            if(allScore < 40){
                point.style.backgroundColor = "#0FBE3E";
                point.style.left = `${allScore}%`;
                point.style.boxShadow = `0 0 13px #0FBE3E`;
            } else if (allScore > 40 && allScore < 60){
                point.style.backgroundColor = "#EBFF00";
                point.style.left = `${allScore}%`;
                point.style.boxShadow = `0 0 13px #b0be01`;
            } else {
                point.style.backgroundColor = "#FA5414"
                point.style.left = `calc(${allScore}% - 25px)`;
                point.style.boxShadow = `0 0 13px #d32f2f`;
            }
        } else {
            countOfQuestion.innerHTML = "Шаг " + (questionCount + 1) + " из " + arrayLength + " - Симптомы невнимательности";
            progressBarPassed(progress, passed);
            quizDisplay(questionCount);
        }
    })
);

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};

const quizCreator = () => {
    for (let [index, value] of quizArray.entries()) {
        let question_type = value.type;
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        nextBtn.classList.add("disabled");

        countOfQuestion.innerHTML = "Шаг " + 1 + " из " + arrayLength + " - Симптомы невнимательности";
        let passed = `${Math.round(1 / arrayLength * 100)}%`;
        progressBarPassed(progress, passed);

        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");

        question_DIV.innerHTML = `${index+1}. ${value.question}`;
        div.appendChild(question_DIV);
        div.innerHTML += '<button class="option-div"  onclick="checker(this, \'' + question_type + '\', 0)">Никогда</button>';
        div.innerHTML += '<button class="option-div"  onclick="checker(this, \'' + question_type + '\', 0)">Редко</button>';
        div.innerHTML += '<button class="option-div"  onclick="checker(this, \'' + question_type + '\', 1)">Иногда</button>';
        div.innerHTML += '<button class="option-div"  onclick="checker(this, \'' + question_type + '\', 2)">Часто</button>';
        div.innerHTML += '<button class="option-div"  onclick="checker(this, \'' + question_type + '\', 3)">Очень часто</button>';
        quizContainer.appendChild(div);
    }
}

const checker = (userOption, question_type, score) =>{
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    question_type === "inattention" ? scoreInattention += score : scoreImpulsivity += score;

    userOption.classList.add("selected");
    nextBtn.classList.remove("disabled");

    options.forEach((element) => {
        if(!userOption.isEqualNode(element)){
            element.classList.remove('selected')
        }
    });
}

const progressBarPassed = (element, passed) => {
    element.style.width = passed;
    element.innerText = passed;
}

const initial = () => {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreInattention = 0;
    scoreImpulsivity = 0;
    quizCreator();
    quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
    if (!name.value){
        name.classList.add("input-error");
    } else if(!email.value){
        email.classList.add("input-error");
    } else{
        name.classList.remove("input-error");
        email.classList.remove("input-error");
        displaySection.classList.remove("hide");
        startSection.classList.add("hide");
        initial();
    }
});
