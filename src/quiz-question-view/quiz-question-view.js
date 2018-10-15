"use strict";

import stylesheet from "./quiz-question-view.css";

class QuizQuestionView {


    /**
     * Konstruktor,
     * @param {Objekt} app Zentrales App-Objekt der Anwendung
     */
    constructor(app, questions) {
        this._app = app;
        this.questions = questions;
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
    onShow () {
        // Anzuzeigende HTML-Elemente ermitteln
        let section = document.querySelector("#quiz-question-view").cloneNode(true);

        // Referenz über HTML Elemente für Fragen
        let question = section.querySelector(".question");
        let questionnr = section.querySelector(".question-number")

        //Event beim Button "Prüfen"  registrieren
        let submitbutton = section.querySelector(".submit-button");
        submitbutton.addEventListener("click", () => this._checkAnswer());

        //Event beim Button "Weiter" registrieren
        let nextbutton = section.querySelector(".next-button");
        nextbutton.addEventListener("click", () => this._showNextQuestion());

        question.innerHTML = `${this.questions[0]["german"]}` ;
        questionnr.innerHTML = `${this.questions[0]["number"]}`;

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
    onLeave(goon) {
        return true;
    }

    /**
    * @return {String} Titel für die Titelzeile des Browsers
    */
    get title() {
        return "Quiz";
    }

    /*Vergleicht die vom Anwender angegebene Antwort mit der richtigen Antwort
    * zeigt das Ergebnis an
    */
    _checkAnswer() {
        // Referenz über HTML Elemente für das Ergebnis, die angegebene Antwort
        let result = document.querySelector(".result");
        let answer = document.querySelector(".answer").value;

        //Questionnummer ermitteln
        let questionnr = document.querySelector(".question-number").innerText;

        let submitbutton = document.querySelector(".submit-button");
        submitbutton.disabled = true;

        //Antworten vergleichen und Ergebnis anzeigen
        if (answer === this.questions[questionnr-1]["english"]) {
                result.innerHTML = "Richtig!";
        }
        else {
           result.innerHTML = "Falsch!";
        }
    }

    // zeigt die naecste Frage, wenn sie geprüft wurde
    _showNextQuestion () {
        let number = document.querySelector(".question-number").innerText;
        let question = document.querySelector(".question");
        let questionnr = document.querySelector(".question-number");

        if (number < 10) {
            question.innerHTML = `${this.questions[number]["german"]}` ;
            questionnr.innerHTML = `${this.questions[number]["number"]}`;
        }



    }



}

















export default QuizQuestionView;
