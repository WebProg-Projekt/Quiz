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
        let questionnr = section.querySelector(".question-number")

        //Eventlistener beim Button "Prüfen" registrieren
        let submitbutton = section.querySelector(".submit-button");
        submitbutton.addEventListener("click", () => this._checkAnswer());

        //Eventlistener beim Button "Weiter" registrieren
        let nextbutton = section.querySelector(".next-button");
        nextbutton.addEventListener("click", () => this._showNextQuestion());

        // Die erste Frage und die Fragennummer anzeigen
        question.innerHTML = `${this._questions[0]["deutsch"]}` ;
        questionnr.innerHTML = `${this._questions[0]["nummer"]}`;

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
    * zeigt, ob die Antwort richtig oder falsch war
    * passt die Score an
    */
    _checkAnswer() {
        // Referenz über HTML Elemente
        let result = document.querySelector(".result");
        let answer = document.querySelector(".answer").value;
        let submitbutton = document.querySelector(".submit-button");
        let answerfield = document.querySelector(".answer");

        //Fragennummer der angezeigten Frage ermitteln
        let questionnr = document.querySelector(".question-number").innerText;

        //Prüfen ob eine Antwort eingegeben wurde
        if (!answer) {
            alert("Bitte geben Sie Ihre Antwort ein!");
        }
        else  {
            // Button "Prüfen" deaktivieren, damit eine Frage nur einmal geprüft werden kann
            submitbutton.disabled = true;

            // Eingabefeld für die Frage deaktivieren
            answerfield.disabled = true;

            answer = answer.toLowerCase();
            answer = answer.trim();
            this._questions[questionnr-1]["english"] = this._questions[questionnr-1]["english"].toLowerCase();
            this._questions[questionnr-1]["english"] = this._questions[questionnr-1]["english"].trim();


            //Antworten vergleichen und Ergebnis anzeigen
            if (answer === this._questions[questionnr-1]["english"]) {
                    result.innerHTML = "Richtig!";
                    this._score ++;
                    console.log(this._score);
                }
            else {
                result.innerHTML = `Falsch! Die rictige Antwort ist: ${this._questions[questionnr-1]["english"]}` ;
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
        let questionnr = document.querySelector(".question-number");
        let answer = document.querySelector(".answer");
        let submitbutton = document.querySelector(".submit-button");
        let result = document.querySelector(".result");

        /* Erst mal wird geprüft ob die Antwort schon geprüft wurde.
            - Wenn nicht, wird der Anwender aufgefordert, seine Antwort zu überprüfen.
            - Wenn ja, wird geprüft ob die letzte (zehnte) Frage angezeigt wird,
            wenn nicht wird  die naechste Frage angezeigt.
        */
        if (submitbutton.disabled) {
            if (number < 10) {
                question.innerHTML = `${this._questions[number]["deutsch"]}` ;
                questionnr.innerHTML = `${this._questions[number]["nummer"]}`;

                /*Submit Button aktiv machen,
                den Inhalt des Inputfelds und das Ergebnis der vorherigen Frage löschen,
                Eingabefeld für die Frage wieder aktivieren*/
                submitbutton.disabled = false;
                answer.value ="";
                result.innerHTML =" ";
                let answerfield = document.querySelector(".answer");
                answerfield.disabled = false;
            }
        }
        else {
            alert ("Bitte prüfen Sie erst Ihre Antwort");
        }




    }



}

















export default QuizQuestionView;
