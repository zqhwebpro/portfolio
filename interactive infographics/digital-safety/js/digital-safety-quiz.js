/**
 * Digital Safety & Parenting Quiz
 * -------------------------------------------------------------
 * Powers the interactive knowledge test on internet safety for parents.
 * Evaluates user responses to multiple-choice questions, updates dynamic progress indicators,
 * presents animated explanation modals for correct/wrong answers, and calculates pass/fail results.
 */

$(document).ready(function () {
    'use strict';

    // External guide link navigation
    $('.btn-guide, .guide-btn').on('click', function (e) {
        e.preventDefault();
        window.location.href = 'https://parent.guide/to-the-internet/access';
        return false;
    });

    /**
     * Quiz Question Bank
     * Structure:
     * - q: Question text
     * - o: Array of option strings
     * - a: Correct answer index (0-based)
     * - e: Educational explanation text
     */
    const questions = [
        {
            q: 'Using search filters like Google Safesearch is 100% effective in protecting your child from harmful content?',
            o: ['Yes', 'No'],
            a: 1,
            e: 'While SafeSearch filters results, it doesn’t block access to the rest of the internet where harmful content does exist.'
        },
        {
            q: 'What information should never be revealed to an online acquaintance?',
            o: [
                'Your Last Name',
                'Address',
                'Phone Number',
                'Usernames',
                'Passwords',
                'All of the above'
            ],
            a: 5,
            e: 'All of that information can be used for identity theft or other malicious purposes.'
        },
        {
            q: 'What is the minimum age to use social media platforms like Snapchat, Instagram, Twitter and Facebook?',
            o: ['Any age', '18', '13', '16'],
            a: 2,
            e: 'While 13 is the minimum age for users to sign up, these can be falsified by users. Doing so can violate terms of service and the account in question can be deleted.'
        },
        {
            q: 'What does the term “digital birth” mean?',
            o: [
                'A child’s first online presence',
                'First social media account',
                'First email address',
                'A digital birth certificate'
            ],
            a: 0,
            e: 'Digital birth is a term coined to define the first instance of a person existing online. For example, parents taking photos of their baby and uploading to Facebook would be that baby’s digital birth.'
        },
        {
            q: 'Many teens and tweens have “Snapchat streaks” (also called Snapstreaks) with their friends. What is this?',
            o: [
                'Inside and personal jokes with their friends on the platform',
                'A viral trend that consists of posting videos of themselves running around naked',
                'A number that tells you how many days in a row they’ve texted each other'
            ],
            a: 2,
            e: 'A Snapchat streak is a number that tells you how many days in a row they’ve texted each other.'
        },
        {
            q: 'What is trolling?',
            o: [
                'Deliberately targeting a person online in way that seeks to intimidate and shame',
                'Harassing groups online in an inflammatory, attention-seeking way for ‘fun’',
                'Popping out from under a bridge to scare billy goats away'
            ],
            a: 1,
            e: 'Trolling is harassing groups, people or persons in an inflammatory way that while is said for “fun”, is often more upsetting and intended to derail a conversation.'
        },
        {
            q: 'Should you set time limits for your child’s internet usage?',
            o: ['Yes', 'No'],
            a: 0,
            e: 'Setting a time limit for your child’s internet usage develops boundaries for your child, as studies have shown that too much screen time for children can have negative effects.'
        }
    ];

    /**
     * Quiz State Model
     * @param {Array} qList - List of question objects
     */
    function QuizModel(qList) {
        this.questions = qList;
        this.score = 0;
        this.questionIndex = 0;
    }

    // Returns current active question
    QuizModel.prototype.getCurrentQuestion = function () {
        return this.questions[this.questionIndex];
    };

    // Checks if all questions have been answered
    QuizModel.prototype.isEnded = function () {
        return this.questionIndex >= this.questions.length;
    };

    // Evaluates selected answer, updates score and visual progress bar
    QuizModel.prototype.submitAnswer = function (selectedIndex) {
        const currentQ = this.getCurrentQuestion();
        const progressIndicator = document.getElementById('question' + this.questionIndex);

        if (selectedIndex === currentQ.a) {
            this.score++;
            if (progressIndicator) progressIndicator.style.backgroundColor = '#9ED03C'; // Green for correct

            $('#correct-modal p#explain').text(currentQ.e);
            $('#correct-modal').modal('show');
        } else {
            if (progressIndicator) progressIndicator.style.backgroundColor = '#C00010'; // Red for incorrect

            $('#wrong-modal p#explain').text(currentQ.e);
            $('#wrong-modal').modal('show');
        }

        $('.quiz-wrap').hide();
        this.questionIndex++;
    };

    const quiz = new QuizModel(questions);

    /**
     * Resets button choice visibility
     */
    function resetChoices() {
        for (let i = 0; i < 6; i++) {
            $('#btn-choice' + i).hide();
        }
    }

    /**
     * Renders active question or displays final score results
     */
    function renderQuizView() {
        if (quiz.isEnded()) {
            $('.quiz-wrap').hide();
            // Passing threshold: at least 5 correct answers out of 7
            if (quiz.score >= 5) {
                $('#done-passed-modal').modal('show');
            } else {
                $('#done-failed-modal').modal('show');
            }
        } else {
            const currentQ = quiz.getCurrentQuestion();
            $('#question').html(currentQ.q);

            resetChoices();

            // Populate choice buttons
            currentQ.o.forEach(function (choiceText, idx) {
                $('#choice' + idx).html(choiceText);
                $('#btn-choice' + idx).show();
            });

            $('.quiz-wrap').show();
        }
    }

    /**
     * Option Selection Listeners
     */
    for (let i = 0; i < 6; i++) {
        $('#btn-choice' + i).on('click', function () {
            quiz.submitAnswer(i);
        });
    }

    /**
     * Modal Continue Button Listener
     * Resumes quiz and advances to the next question when user dismisses explanation modal.
     */
    $(document).on('click', '.continue-btn', function () {
        $('#correct-modal, #wrong-modal').modal('hide');
        renderQuizView();
    });

    // Start quiz
    renderQuizView();
});
