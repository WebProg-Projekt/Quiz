"use strict";

import stylesheet from "./quiz-question-view.css";

class QuizQuestionView {

    //einige Fragen als Übergangslösüng, bis wir im Browser tatsaechlich Vokabeln speichern können



    /**
     * Konstruktor,
     * @param {Objekt} app Zentrales App-Objekt der Anwendung
     */
    constructor(app) {
        this._app = app;
        
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

    //Quiz erstellen, also 10 Fragen aussuchen
    generateQuiz () {

    }


    showNextSlide() {}

}





export default QuizQuestionView;
