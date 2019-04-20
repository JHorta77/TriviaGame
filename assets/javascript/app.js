$(document).ready(function () {

    var questions = [{
        question: "Who is the All Time Points leader in the NHL",
        choices: ["Wayne Gretzky", "Mario Lemieux", "Jaromir Jagr", "Gordie Howe"],
        correctAnswer: "Wayne Gretzky",
        image: "./assets/images/gretzky.jpg",
    },
    {
        question: "Who is the most winningest goalie in the NHL",
        choices: ["Roberto Luongo", "Patrick Roy", "Martin Brodeur", "Jacques Plante"],
        correctAnswer: "Martin Brodeur",
        image: "./assets/images/broduer.jpg",
    },
    {
        question: "Who is the tallest player to ever play in the NHL",
        choices: ["Chris Pronger", "Zdeno Chara", "Hal Gill", "John Scott"],
        correctAnswer: "Zdeno Chara",
        image: "./assets/images/Chara.jpg",
    },
    {
        question: "Who is the smallest player to ever play in the NHL",
        choices: ["Rocco Grimaldi", "Martin St Louis", "Sergei Samsonov", "Brain Gionta"],
        correctAnswer: "Rocco Grimaldi",
        image: "./assets/images/grimaldi.jpg",
    },
    {
        question: "Which team won the Presidents Trophy then got sweeped in the playoffs",
        choices: ["Washington Capitals", "San Jose Sharks", "Vancouver Canucks", "Tampa Bay Lightning"],
        correctAnswer: "Tampa Bay Lightning",
        image: "./assets/images/Tampa_Bay_Lightning_Logo.png",
    }]

    var questionCounter = 0;
    var time = 15;
    var correctGuesses = 0;
    var incorrectGuesses = 0;

    function questionContent() {
        $("#gameScreen").append("<p><strong>" +
            questions[questionCounter].question +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[0] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[1] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[2] +
            "</p><p class='choices'>" +
            questions[questionCounter].choices[3] +
            "</strong></p>");
    }


    function userWin() {
        $("#gameScreen").html("<p>You got it right!</p>");
        correctGuesses++;
        var correctAnswer = questions[questionCounter].correctAnswer;
        $("#gameScreen").append("<p>The answer was <span class='answer'>" +
            correctAnswer +
            "</span></p>" +
            questions[questionCounter].image);
        setTimeout(nextQuestion, 4000);
        questionCounter++;
    }


    function userLoss() {
        $("#gameScreen").html("<p>Nope, that's not it!</p>");
        incorrectGuesses++;
        var correctAnswer = questions[questionCounter].correctAnswer;
        $("#gameScreen").append("<p>The answer was <span class='answer'>" +
            correctAnswer +
            "</span></p>" +
            questions[questionCounter].image);
        setTimeout(nextQuestion, 4000);
        questionCounter++;
    }

    function userTimeout() {
        if (time === 0) {
            $("#gameScreen").html("<p>You ran out of time!</p>");
            incorrectGuesses++;
            var correctAnswer = questions[questionCounter].correctAnswer;
            $("#gameScreen").append("<p>The answer was <span class='answer'>" +
                correctAnswer +
                "</span></p>" +
                questions[questionCounter].image);
            setTimeout(nextQuestion, 4000);
            questionCounter++;
        }
    }


    function resultsScreen() {
        if (correctGuesses === questions.length) {
            var endMessage = "You know your Hockey";

        }
        else if (correctGuesses > incorrectGuesses) {
            var endMessage = "Good work! you can improve";

        }
        else {
            var endMessage = "Keep your stick on the ice";

        }
        $("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" +
            correctGuesses + "</strong> right.</p>" +
            "<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
        $("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
        $("#bottomText").html(bottomText);
        gameReset();
        $("#start").click(nextQuestion);
    }


    function timer() {
        clock = setInterval(countDown, 1000);
        function countDown() {
            if (time < 1) {
                clearInterval(clock);
                userTimeout();
            }
            if (time > 0) {
                time--;
            }
            $("#timer").html("<strong>" + time + "</strong>");
        }
    }

    function nextQuestion() {
        if (questionCounter < questions.length) {
            time = 15;
            $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
            questionContent();
            timer();
            userTimeout();
        }
        else {
            resultsScreen();
        }

    }

    function gameReset() {
        questionCounter = 0;
        correctGuesses = 0;
        incorrectGuesses = 0;
    }

    function startGame() {
        $("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
        $("#start").hide();

        questionContent();
        timer();
        userTimeout();
    }


    $("#start").click(nextQuestion);

    $("#gameScreen").on("click", ".choices", (function () {
        var userGuess = $(this).text();
        if (userGuess === questions[questionCounter].correctAnswer) {
            clearInterval(clock);
            userWin();
        }
        else {
            clearInterval(clock);
            userLoss();
        }
    }));
});
