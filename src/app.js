"use strict";

//Stylesheets und Bootstrap importieren
import stylesheet from "./app.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// JavaScript Code importieren
import Navigo from "navigo/lib/navigo.js";
import VocabularyDisplayEdit from "./vocabulary-display-edit/vocabulary-display-edit.js";
import VocabularyOverview from "./vocabulary-overview/vocabulary-overview.js";
import QuizQuestionView from "./quiz-question-view/quiz-question-view.js"
import Database from "./database.js";

/**
 * Hauptklasse der Anwendung. Kümmert sich darum, die Anwendung auszuführen
 * und die angeforderten Bildschirmseiten anzuzeigen.
 */
class App {
    /**
     * Konstruktor.
     */
    constructor() {
        this._title = "VocabuLearn";
        this._currentView = null;
        this._vokabeln = new Database.Vokabeln();

        // Single Page Router aufsetzen
        /**Diese Zeilen definieren die URL-Struktur der App,
        * wobei jedes URL-Pattern mit einer anonymen Lambda-Funktion
        *(zu erkennen am Doppelpfeil =>) verknüpft ist.
        *Es liegt nahe, dass der Router die entsprechende Lambda-Funktionen
        *aufruft, wenn eine URL erkannt wurde, um dadurch den sichtbaren Inhalt
        * zu wechseln.
        */
    this._router = new Navigo();
    this._currentUrl = "";
    this._navAborted = false;

    this._router.on({
        "*":                             () => this.showVocabularyOverview(),
        "/vocabulary/new/":              () => this.showVocabularyDisplayEdit("", "new"),
        "/vocabulary/display/:id/":  params => this.showVocabularyDisplayEdit(params.id, "display"),
        "/vocabulary/edit/:id/":     params => this.showVocabularyDisplayEdit(params.id, "edit"),
        "/quiz":                         () => this.showQuizQuestionView(),
    });

    this._router.hooks({
        after: (params) => {
            if (!this._navAborted) {
                // Navigation durchführen, daher die neue URL merken
                this._currentUrl = this._router.lastRouteResolved().url;
            } else {
                // Navigation abbrechen, daher die URL in der Adresszeile
                // auf den alten Wert der bisherigen View zurücksetzen
                this._router.pause(true);
                this._router.navigate(this._currentUrl);
                this._router.pause(false);

                this._navAborted = false;
            }
        }
    });

    /*
     Load Chance
     (Chance ist eine Bibliothek, die die Generierung zufällige unique Nummer ermöglicht)
     */
    var Chance = require('chance');

    // Instantiate Chance so it can be used
    var chance = new Chance();

}


    /**
     * Ab hier beginnt die Anwendung zu laufen.
     */
    async start () {
        // Vokabeln einfügen, wenn es noch keine gibt
        await this._initDatabase();

        // vor Single Page Router hatten wir -> this.showSongOverview();
        /*In der start()-Methode müssen wir nun nicht mehr explizit
        *die Übersichtsseite aufrufen. Stattdessen sagen wir dem Router,
        *dass er nun dafür verantwortlich ist, die URL, mit der die gesamte App
        *gestartet wurde, auszuwerten, um die erste View zu ermitteln:
        */
        this._router.resolve();
    }

    /**
     * Aufruf der Übersichtsseite der vorhandenen Songs.
     * @return {Boolean} Flag, ob die neue Seite aufgerufen werden konnte
     */
    showVocabularyOverview() {
        let view = new VocabularyOverview(this);
        this._switchVisibleView(view);
    }

    /**
     * Aufruf der Detailseite zur Anzeige oder zum Bearbeiten eines Songs.
     *
     * @param  {String} id Song-ID
     * @param  {String} mode "new", "display" oder "edit"
     * @return {Boolean} Flag, ob die neue Seite aufgerufen werden konnte
     */
    showVocabularyDisplayEdit(id, mode) {
        let view = new VocabularyDisplayEdit(this, id, mode);
        this._switchVisibleView(view);
    }

    async showQuizQuestionView () {
    //showQuizQuestionView () {
        //let questions = await this._selectQuestions ();
        let questions = await this._selectQuestions ();
        let view = new QuizQuestionView(this, questions);
        this._switchVisibleView(view);
    }


    /**
     * Hilfsklasse zum Umschalten auf eine neue Seite. Sie ruft zunächst die
     * Methode onLeave() der gerade sichtbaren View auf und prüft damit, ob
     * die View verlassen werden kann. Falls ja ruft sie die Methode onShow()
     * der neuen View auf und übergibt das Ergebnis an die eigene Methode
     * _switchVisibleContent(), um den sichtbaren Inhalt der Seite auszutauschen.
     *
     * @param  {Object} view View-Objekt mit einer onShow()-Methode
     * @return {Boolean} Flag, ob die neue Seite aufgerufen werden konnte
     */
     async _switchVisibleView(view) {
     // Callback, mit dem die noch sichtbare View den Seitenwechsel zu einem
     // späteren Zeitpunkt fortführen kann, wenn sie in der Methode onLeave()
     // false zurückliefert. Dadurch erhält sie die Möglichkeit, den Anwender
     // zum Beispiel zu fragen, ob er ungesicherte Daten speichern will,
     // bevor er die Seite verlässt.
     let newUrl = this._router.lastRouteResolved().url;
     let goon = () => {
         // ?goon an die URL hängen, weil der Router sonst nicht weiternavigiert
         this._router.navigate(newUrl + "?goon");
     }

     // Aktuelle View fragen, ob eine neue View aufgerufen werden darf
     if (this._currentView) {
         let goonAllowed = await this._currentView.onLeave(goon);

         if (!goonAllowed) {
             this._navAborted = true;
             return false;
         }
     }

     // Alles klar, aktuelle View nun wechseln
     document.title = `${this._title} – ${view.title}`;

     this._currentView = view;
     this._switchVisibleContent(await view.onShow());
     return true;
 }

    /**
     * Auswechseln des sichtbaren Inhalts der App. Hierfür muss der Methode
     * ein Objekt mit folgendem Aufbau übergeben werden:
     *
     *   {
     *      className: "CSS-Klassenname",
     *      topbar: [DOM Element, DOM Element, DOM Element, ...],
     *      main: [DOM Element, DOM Element, DOM Element, ...],
     *   }
     *
     * Beide Attribute (topbar und main) sind optional, was dazu führt, dass
     * im jeweiligen Bereich einfach nichts angezeigt wird. Werden sie jedoch
     * mitgegeben, müssen sie mit forEach(element => { … }) iteriert werden
     * können, um ihren Inhalt in den DOM-Baum zu integrieren.
     *
     * Wichtig ist, dass die übergebenen Elemente noch an keiner Stelle im
     * DOM vorhanden sein dürfen. Werden die Elemente in der index.html
     * als Vorlage definiert, muss hier deshalb eine Kopie anstelle der
     * Elemente selbst übergeben werden!
     *
     * @param {Object} content Objekt mit den anzuzeigenden DOM-Elementen
     */
    _switchVisibleContent(content) {
        // <header> und <main> des HTML-Grundgerüsts ermitteln
        let app = document.querySelector("#app");
        let header = document.querySelector("#app > header");
        let main = document.querySelector("#app > main");

        // Zuvor angezeigte Inhalte entfernen
        // Bei der Topbar nur die untere Zeile, im Hauptbereich alles!
        app.className = "";
        header.querySelectorAll(".bottom").forEach(e => e.parentNode.removeChild(e));
        main.innerHTML = "";

        // CSS-Klasse übernehmen, um die viewspezifischen CSS-Regeln zu aktivieren
        if (content && content.className) {
            app.className = content.className;
        }

        // Neue Inhalte der Topbar einfügen
        if (content && content.topbar) {
            content.topbar.forEach(element => {
                element.classList.add("bottom");
                header.appendChild(element);
            });
        }

        // Neue Inhalte des Hauptbereichs einfügen
        if (content && content.main) {
            content.main.forEach(element => {
                main.appendChild(element);
            });
        }

        // Navigo an die Links in der View binden
        this._router.updatePageLinks();
    }

    async _initDatabase() {
        // Vokabeln in Dexie einfügen
        let vok = await this._vokabeln.search();
        console.log("Datenbank initialisieren, Anzahl Vokabeln:", vok.length);
        console.log(vok);

        if (vok.length < 10) {
            await Promise.all([
                this._vokabeln.saveNew({
                    deutsch: "Königin",
                    englisch: "Queen",
                    notiz: "Pl: die Königinnen",
                    format: "html",
                }),
                this._vokabeln.saveNew({
                    deutsch: "König",
                    englisch: "King",
                    notiz: "Pl: die Könige",
                    format: "html",
                }),
                this._vokabeln.saveNew({
                    deutsch: "Prinz",
                    englisch: "Prince",
                    notiz: "Pl: die Prinzen",
                    format: "html",
                }),
                this._vokabeln.saveNew({
                    deutsch: "Hund",
                    englisch: "Dog",
                    notiz: "Pl: die Hunde",
                    format: "html",
                }),
                this._vokabeln.saveNew({
                    deutsch: "Katze",
                    englisch: "Cat",
                    notiz: "Pl: die Katzen",
                    format: "html",
                }),
                this._vokabeln.saveNew({
                    deutsch: "Maus",
                    englisch: "Mouse",
                    notiz: "Pl: die Mäuse",
                    format: "html",
                }),
                this._vokabeln.saveNew({
                    deutsch: "Möhre",
                    englisch: "Carrot",
                    notiz: "Pl: die Möhren",
                    format: "html",
                }),
                this._vokabeln.saveNew({
                    deutsch: "Gurke",
                    englisch: "Cucumber",
                    notiz: "Pl: die Gurken",
                    format: "html",
                }),
                this._vokabeln.saveNew({
                    deutsch: "Chalotte",
                    englisch: "Onion",
                    notiz: "Pl: die Chalotten",
                    format: "html",
                }),
                this._vokabeln.saveNew({
                    deutsch: "Glocke",
                    englisch: "Bell",
                    notiz: "Pl: die Glocken",
                    format: "html",
                }),

            ]);

            vok = await this._vokabeln.search();
            console.log("Gespeicherte Vokabeln:", vok);
        }
    }

    // Sucht 10 verschiedene Fragen aus der Datenbank und liefert als JSON zurück
    //_selectQuestions () {
     async _selectQuestions () {
        //let vok =  this._vokabeln.search();
        let vok = await this._vokabeln.search();

        /* 10 zufällige und unique Nummer zwischen 0- vok.length generieren
        und in einem Array speichern*/
        //let randomIDs = chance.unique (chance.integer, 4, { min: 1, max: 10});
        let randomIDs = chance.unique (chance.integer, 4, { min: 1, max: vok.length});
        console.log(randomIDs);



        //let erste = await this._vokabeln.getById(randomIDs[0]);
        //console.log("Erste Random Vokabel - Objekt", erste);
        //console.log(erste["englisch"]);

        /* Ein leeres Array generieren,
        Wörter nach zufaellig gewaehlten IDs suchen und in das Leere Array speichern
        */
        let questions = [];
        randomIDs.forEach( id => {
        //randomIDs.forEach( async (id) => {
            let vocabulary = this._vokabeln.getById(id);
            //let vocabulary = await this._vokabeln.getById(id);
            //console.log(id, vocabulary);
            //console.log(vocabulary["deutsch"]);
            //questions.push(vocabulary);
        });

        //console.log(questions);
        //console.log(questions[0]["deutsch"]);

        //return questions;

        //Fragen ausgeben
        return [
        {
            nummer: 1,
            deutsch: "Hund",
            english: "dog"
        },
        {
            nummer: 2,
            deutsch: "die Katze",
            english: "cat"
        },
        {
            nummer: 3,
            deutsch: "Keller",
            english: "basement"
        }
    ];




    };



}

export default App;
