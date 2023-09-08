let currentQuestion = 0; // Start from the first question
let userName = "";
let userEmail = "";

const questions = [
    {
        text: "Do you have a saving money process?",
        answers: [
            { text: "No", nextQuestion: -1, result: "Your PROBLEM is you have no system in place." },
            { text: "Yes", nextQuestion: 1 }
        ]
    },
    {
        text: "Is your monthly income more than your monthly expenses?",
        answers: [
            { text: "No", nextQuestion: -1, result: "Your PROBLEM is negative cashflow. SOLUTION is to create a positive cashflow." },
            { text: "Yes", nextQuestion: 2 }
        ]
    },
    {
        text: "Do you save money before spending?",
        answers: [
            { text: "No", nextQuestion: -1, result: "Your PROBLEM is a bad saving habit. SOLUTION is to 'pay yourself first', meaning save a portion of your monthly income before spending the rest." },
            { text: "Yes", nextQuestion: 3 }
        ]
    },
    {
        text: "Is your savings more than 20% of your monthly income?",
        answers: [
            { text: "No", nextQuestion: 4 },
            { text: "Yes", nextQuestion: -1, result: "Your PROBLEM is your income is the bottleneck. SOLUTION is to increase your income." }
        ]
    },
    {
        text: "Do you have a high income or low income?",
        answers: [
            { text: "High", nextQuestion: -1, result: "Your PROBLEM is wasteful spending. SOLUTION is to have a budget plan to reduce expenses." },
            { text: "Low", nextQuestion: -1, result: "Your PROBLEM is your income is the bottleneck. SOLUTION is to increase your income." }
        ]
    }
];

function displayQuestion() {
    const question = questions[currentQuestion];
    let html = `<p>${question.text}</p>`;
    
    question.answers.forEach((answer, index) => {
        html += `<button onclick="handleAnswer(${index})">${answer.text}</button>`;
    });
    
    document.getElementById("question-container").innerHTML = html;
}

function handleAnswer(index) {
    const answer = questions[currentQuestion].answers[index];
    
    // Record the answer
    const recordDiv = document.createElement("div");
    recordDiv.innerText = questions[currentQuestion].text + ": " + answer.text;
    document.getElementById("answer-record").appendChild(recordDiv);
    
    if (answer.nextQuestion === -1) {
        document.getElementById("result").innerText += "\n\n" + answer.result;
        document.getElementById("question-container").innerHTML = "";
    } else {
        currentQuestion = answer.nextQuestion;
        displayQuestion();
    }
}

function handleBack() {
    if (currentQuestion <= 0) {
        alert("You're at the first question.");
        return;
    }

    // Remove the last recorded answer
    const answerRecord = document.getElementById("answer-record");
    answerRecord.removeChild(answerRecord.lastChild);

    // Navigate to the previous question
    currentQuestion--;
    displayQuestion();
}

document.getElementById("reset-btn").addEventListener("click", function() {
    currentQuestion = 0;
    document.getElementById("answer-record").innerHTML = "";
    document.getElementById("result").innerText = "";
    displayQuestion();
});

document.getElementById("email-btn").addEventListener("click", function() {
    const subject = "Money Saving Diagnosis Results";
    const body = document.getElementById("answer-record").innerText + "\n\n" + document.getElementById("result").innerText;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.getElementById("print-btn").addEventListener("click", function() {
    window.print();
});

document.getElementById("share-btn").addEventListener("click", function() {
    if (navigator.share) {
        navigator.share({
            title: 'Money Saving Diagnosis Results',
            text: document.getElementById("answer-record").innerText + "\n\n" + document.getElementById("result").innerText,
            url: window.location.href,
        });
    } else {
        alert("Sharing is not supported on this browser.");
    }
});

displayQuestion();
