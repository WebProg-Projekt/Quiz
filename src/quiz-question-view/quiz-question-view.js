"use strict";

import stylesheet from "./quiz-question-view.css";

class QuizQuestionView {

    /**
     * Konstruktor,
     * @param {Objekt} app Zentrales App-Objekt der Anwendung
     * @param {Objekt} questions 10 zufällig ausgewählte Fragen für die Quiz
     */
    constructor(app, questions) {
        this._app = app;
        this._questions = questions;
        console.log(this._questions);
        this._score = 0;
        this._questionnr = 1;
    }

    /**
     * Von der Klasse App aufgerufene Methode, um die Seite anzuzeigen. Die
     * Methode gibt daher ein passendes Objekt zurück, das an die Methode
     * _switchVisibleContent() der Klasse App übergeben werden kann, um ihr
     * die darzustellenden DOM-Elemente mitzuteilen.
     *
     * @return {Object} Darzustellende DOM-Elemente gemäß Beschreibung der
     * Methode App._switchVisibleContent()
     */
    async onShow () {
        // Anzuzeigende HTML-Elemente ermitteln
        let section = document.querySelector("#quiz-question-view").cloneNode(true);

        // Referenz über HTML Elemente für die Anzeige der Frage und der Fragennummer
        let question = section.querySelector(".question");
        let questionNr = section.querySelector(".question-number")

        //Eventlistener beim Button "Prüfen" registrieren
        let submitbutton = section.querySelector(".submit-button");
        submitbutton.addEventListener("click", () => this._checkAnswer());

        //Eventlistener beim Button "Weiter" registrieren
        let nextbutton = section.querySelector(".next-button");
        nextbutton.addEventListener("click", () => this._showNextQuestion());

        // Die erste Frage und die Fragennummer anzeigen
        question.innerHTML = `${this._questions[0]["deutsch"]}` ;
        questionNr.innerHTML = `Frage ${this._questionnr}`;

        return {
        className: "quiz-question-view",
        topbar: section.querySelectorAll("header > *"),
        main: section.querySelectorAll("main > *"),
        };
    }

    /**
     * Von der Klasse App aufgerufene Methode, um festzustellen, ob der Wechsel
     * auf eine neue Seite erlaubt ist. Wird hier true zurückgegeben, wird der
     * Seitenwechsel ausgeführt.
     *
     * @param  {Function} goon Callback, um den Seitenwechsel zu einem späteren
     * Zeitpunkt fortzuführen, falls wir hier false zurückgeben
     * @return {Boolean} true, wenn der Seitenwechsel erlaubt ist, sonst false
    */
    async onLeave(goon) {
        return true;
    }

    /**
    * @return {String} Titel für die Titelzeile des Browsers
    */
    get title() {
        return "Quiz";
    }

    /*Vergleicht die vom Anwender angegebene Antwort mit der richtigen Antwort,
    * zeigt an, ob die Antwort richtig oder falsch war
    * erhöht die Score, wenn die Antwort richtig ist
    */
    _checkAnswer() {
        // Referenz über HTML Elemente
        let result = document.querySelector(".result");
        let answer = document.querySelector(".answer").value;
        let submitbutton = document.querySelector(".submit-button");
        let answerfield = document.querySelector(".answer");

        //Vorbereitung für die neue Frage
        result.classList.remove("true");

        //Prüfen ob eine Antwort eingegeben wurde
        if (!answer) {
            alert("Bitte geben Sie Ihre Antwort ein!");
        }
        //Antworten vergleichen und das Ergebnis anzeigen
        else  {
            // Button "Prüfen" deaktivieren und unsichtbar machen, damit eine Frage nur einmal geprüft werden kann
            submitbutton.disabled = true;
            submitbutton.classList.add("invisible");

            //Eingabefeld für die Frage deaktivieren
            answerfield.disabled = true;

            //Eingegebene Antworten zum Vergleich vorbereiten
            answer = answer.toLowerCase();
            answer = answer.trim();
            this._questions [this._questionnr-1]["englisch"] = this._questions [this._questionnr-1]["englisch"].toLowerCase();
            this._questions [this._questionnr-1]["englisch"] = this._questions [this._questionnr-1]["englisch"].trim();

            //Antworten vergleichen und Ergebnis anzeigen
            if (answer === this._questions[this._questionnr-1]["englisch"]) {
                    result.classList.add("true");
                    result.innerHTML = "Richtig!";
                    this._score ++;
                    console.log(this._score);
                }
            else {
                result.innerHTML = `<p class="false">Falsch! </p>
                                    <p>Die rictige Antwort ist: ${this._questions[this._questionnr-1]["englisch"]}</p>` ;
            }
        }
    }

    /* zeigt die naecste Frage:
     - wenn die aktuelle Frage geprüft wurde und
     - wenn die bereits angezeigte Frage nicht die zehnte Frage ist.
    */
    _showNextQuestion () {
        // Referenzen über HTML Elemente
        let number = document.querySelector(".question-number").innerText;
        let question = document.querySelector(".question");
        let questionNr = document.querySelector(".question-number");
        let answer = document.querySelector(".answer");
        let submitbutton = document.querySelector(".submit-button");
        let result = document.querySelector(".result");


        /* Erst mal wird geprüft ob die Antwort schon geprüft wurde.
            - Wenn nicht, wird der Anwender aufgefordert, seine Antwort zu überprüfen.
            - Wenn ja, wird geprüft ob die letzte (zehnte) Frage angezeigt wird,
            wenn nicht wird  die naechste Frage angezeigt.
            Nach dem 10. Frage wird die Score angezeigt.
        */
        if (submitbutton.disabled) {
            if (this._questionnr < 10) {
                this._questionnr++;
                question.innerHTML = `${this._questions[this._questionnr-1]["deutsch"]}` ;
                questionNr.innerHTML = `Frage ${this._questionnr}`;

                /*Submit Button aktiv und sichtbar machen,
                den Inhalt des Inputfelds und das Ergebnis der vorherigen Frage löschen,
                Eingabefeld für die Frage wieder aktivieren*/
                submitbutton.disabled = false;
                submitbutton.classList.remove("invisible");
                answer.value ="";
                answer.disabled = false;
                result.innerHTML =" ";
            }
            //Nach der 10.Frage, zeigt die Score an
            else {
                this._questionnr++;
                this._showScore();
            }
        }
        else {
            alert ("Bitte prüfen Sie erst Ihre Antwort");
        }

    }

    //Zeigt die Score an
    _showScore () {
        //Referenz über HTML-Elemente
        let quizbox = document.querySelector("#quiz-box");
        let scorebox = document.getElementById("score-box");

        let score= document.querySelector(".score");
        score.innerHTML = `Ihr Ergebnis ist: ${this._score}`;

        //wechseln zwischen Fragen und Score
        quizbox.classList.remove("vis");
        quizbox.classList.add("hidden");
        scorebox.classList.remove("hidden");
    }


}

export default QuizQuestionView;
