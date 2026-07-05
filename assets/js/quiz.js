(function () {
  "use strict";

  function initQuiz() {
    var questions = document.querySelectorAll("[data-question]");
    var scoreEl = document.getElementById("score-value");
    var totalEl = document.getElementById("score-total");
    var panel = document.getElementById("score-panel");

    if (!questions.length) {
      if (panel) panel.hidden = true;
      return;
    }

    var total = questions.length;
    var answered = 0;
    var correct = 0;

    if (totalEl) totalEl.textContent = String(total);
    if (scoreEl) scoreEl.textContent = "0";

    questions.forEach(function (question) {
      var options = question.querySelectorAll(".option-btn");
      var feedback = question.querySelector(".feedback");

      options.forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (question.classList.contains("is-answered")) return;

          question.classList.add("is-answered");
          answered += 1;

          var isCorrect = btn.getAttribute("data-correct") === "true";
          if (isCorrect) {
            correct += 1;
            btn.classList.add("is-correct");
            if (feedback) {
              feedback.textContent = "¡Correcto!";
              feedback.className = "feedback is-correct-msg";
            }
          } else {
            btn.classList.add("is-wrong");
            options.forEach(function (other) {
              if (other.getAttribute("data-correct") === "true") {
                other.classList.add("is-correct");
              }
            });
            if (feedback) {
              var rightText = "";
              options.forEach(function (other) {
                if (other.getAttribute("data-correct") === "true") {
                  rightText = other.textContent.trim();
                }
              });
              feedback.textContent = "Incorrecto. La respuesta es: " + rightText;
              feedback.className = "feedback is-wrong-msg";
            }
          }

          options.forEach(function (b) {
            b.disabled = true;
          });

          if (scoreEl) {
            scoreEl.textContent = String(correct);
            scoreEl.classList.remove("score-bump");
            void scoreEl.offsetWidth;
            scoreEl.classList.add("score-bump");
          }

          if (answered === total && panel) {
            panel.classList.add("is-complete");
          }
        });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initQuiz);
  } else {
    initQuiz();
  }
})();
