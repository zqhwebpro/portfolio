$(".btn-guide").on("click", function(e) {
  e.preventDefault();
  window.location.href = "https://parent.guide/to-the-internet/access";
  return false;
});

var questions = [
  {
    q:
      "Using search filters like Google Safesearch is 100% effective in protecting your child from harmful content?",
    o: ["Yes", "No"],
    a: 1, // array index of answer
    e:
      "While SafeSearch filters results, it doesn’t block access to the rest of the internet where harmful content does exist."
  },
  {
    q: "What information should never be revealed to an online acquaintance?",
    o: [
      "Your Last Name",
      "Address",
      "Phone Number",
      "Usernames",
      "Passwords",
      "All of the above"
    ],
    a: 5,
    e:
      "All of that information can be used for identity theft or other malicious purposes."
  },
  {
    q:
      "What is the minimum age to use social media platforms like Snapchat, Instagram, Twitter and Facebook",
    o: ["Any age", "18", "13", "16"],
    a: 2,
    e:
      "While 13 is the minimum age for users to sign up, these can be falsified by users. Doing so can violate terms of service and the account in question can be deleted."
  },
  {
    q: "What is the definition of “digital birth” mean?",
    o: [
      "A child’s first online presence",
      "First social media account",
      "First email address",
      "A digital birth certificate"
    ],
    a: 0,
    e:
      "Digital birth is a term coined to define the first instance of a person existing online. For example, parents taking photos of their baby and uploading to Facebook would be that baby’s digital birth."
  },
  {
    q:
      "Many teens and tweens have “Snapchat streaks” (also called Snapstreaks) with their friends. What is this?",
    o: [
      "Inside and personal jokes with their friends on the platform",
      "A viral trend that consists of posting videos of themselves running around naked",
      "A number that tells you how many days in a row they’ve texted each other"
    ],
    a: 2,
    e:
      "A Snapchat streak is a number that tells you how many days in a row they’ve texted each other."
  },
  {
    q: "What is trolling?",
    o: [
      "Deliberately targeting a person online in way that seeks to intimidate and shame",
      "Harassing groups online in an inflammatory, attention-seeking way for ‘fun’",
      "Popping out from under a bridge to scare billy goats away"
    ],
    a: 1,
    e:
      "Trolling is harassing groups, people or persons in an inflammatory way that while is said for “fun”, is often more upsetting and intended to derail a conversation."
  },
  {
    q: "Should you set time limits for your child’s internet usage?",
    o: ["Yes", "No"],
    a: 0,
    e:
      "Setting a time limit for your child’s internet usage develops boundaries for your child, as studies have shown that too much screen time for children can have negative effects."
  }
];

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
};

Quiz.prototype.answer = function(index) {
  var element = document.getElementById("question");
  var correctAnswer = quiz.getQuestionIndex().a;
  var progress = document.getElementById("question" + this.questionIndex);
  var explain = quiz.getQuestionIndex().e;

  if (index === correctAnswer) {
    this.score++;
    progress.style.backgroundColor = "#9ED03C";
    // alert('correct')
    $("#correct-modal").modal("show");
    $(".quiz-wrap").hide();
    $(".continue-btn").click(function() {
      $(".quiz-wrap").show();
    });
    $("#correct-modal p#explain").text(explain);
    // console.log('index' + explain)
  } else {
    // alert('wrong')
    $("#wrong-modal").modal("show");
    progress.style.backgroundColor = "#C00010";
    $("#wrong-modal").modal("show");
    $(".quiz-wrap").hide();
    $(".continue-btn").click(function() {
      $(".quiz-wrap").show();
    });
    $("#wrong-modal p#explain").text(explain);
    // console.log('index' + index)
  }

  console.log("score" + this.score);

  this.questionIndex++;
};

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
};

function populate() {
  if (quiz.isEnded()) {
    // alert('quiz ended');
    $(".continue-btn").click(function() {
      $(".quiz-wrap").show();
      if (quiz.score < 5) {
        // console.log('fail');
        $("#done-failed-modal").modal("show");
        $(".quiz-wrap").hide();
        $(".guide-btn").on("click", function(e) {
          e.preventDefault();
          window.location.href = "https://parent.guide/to-the-internet/access";
          return false;
        });
      }
      if (quiz.score >= 5) {
        // console.log('pass');
        $("#done-passed-modal").modal("show");
        $(".quiz-wrap").hide();
        $(".guide-btn").on("click", function(e) {
          e.preventDefault();
          window.location.href = "https://parent.guide/to-the-internet/access";
          return false;
        });
      }
    });
    console.log(quiz.score);
  } else {
    // show question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().q;

    resetChoices();

    // show options
    var choices = quiz.getQuestionIndex().o;
    for (var i = 0; i < choices.length; i++) {
      $("#btn-choice" + i).show();
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      answer("btn-choice" + i, i);
    }
  }
}

function answer(id, index) {
  var button = document.getElementById(id);
  button.onclick = function() {
    quiz.answer(index);
    populate();
  };
}

function resetChoices() {
  for (var i = 0; i < 6; i++) {
    $("#btn-choice" + i).hide();
  }
}

// Create quiz
var quiz = new Quiz(questions);

// // display quiz
populate();
