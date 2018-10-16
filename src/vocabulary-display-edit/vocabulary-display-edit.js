"use strict";

import stylesheet from "./vocabulary-display-edit.css";
import Database from "../database.js";

 /**
  * View zur Anzeige oder zum Bearbeiten eines Songs.
  */
class VocabularyDisplayEdit {
    /**
     * Konstruktor.
     *
     * @param {Objekt} app Zentrales App-Objekt der Anwendung
     * @param {String} id   ID der darzustellenden Vokabel
     * @param {String} mode "new", "display" oder "edit"
     */
    constructor(app, id, mode) {
        this._app = app;
        this._id = id;
        this._mode = mode;
        this._vokabeln = new Database.Vokabeln();
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
    onShow() {
        // Anzuzeigende HTML-Elemente ermitteln
        let section = document.querySelector("#vocabulary-display-edit").cloneNode(true);

        //addEventListener für speichern --> section.getElementById?????
        let speichern = document.getElementById("sp");
        speichern.addEventListener("click", () => this._saveVocab());

        //addEventListener für löschen
        //let del = document.addEventListener("click",() => this._deleteVocab());

        //addEventListener für bearbeiten

        // SPeichern und Abbrechen sichtbar machen
        let a = document.getElementById("abbrechen");
        a.classList.add("hidden");

        //let input1 = document.getElementById("englisch");
        //input1.attr("disabled");


        return {
            className: "vocabulary-display-edit",
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
        switch (this._mode) {
            case "new":
                return "Vokabel hinzufügen";
            case "edit":
                return "Vokabel bearbeiten";
            default:
                return "Vokabel anzeigen";
        }
    }

    // Button, um zu speichern
    _saveVocab() {
        //let dB = async () => {

            let deutsch1 = document.getElementById("deutsch").value;
            let englisch1 = document.getElementById("englisch").value;
            let notiz1 = document.getElementById("notiz").value;

            this._vokabeln.saveNew({
                deutsch: deutsch1,
                englisch: englisch1,
                notiz: notiz1,
                format: html,
            });

            router.navigate('/');

        //}
    }
    // zurück auf Übersicht! --> Seite wechseln!! wiee

    // Vokabel Bearbeiten
    _showVocab() {
        // --- vocab Overview muss click-Event hinzufügen, wenn click auf (overviev .<liste) --> anzeige sicht

        let editElement = document.getElementById("edit");
            editElement.classList.remove("hidden");
        let abbrElement = document.getElementById("abbr");
            abbrElement.classList.remove("hidden");

        //Felder ausgrauen
        document.getElementById('inputFelder').setAttribute('disabled','disabled', 'disabled');



    }

    //einzelne Vokabel löschen
    /*_deleteVocab() {
        alert("Wirklich löschen??");
        // --in database.js löschen --> wie bekomme ich id? und
        Vokabeln.delete(id);
        // zurück auf Übersicht
    }*/
}

export default VocabularyDisplayEdit;
