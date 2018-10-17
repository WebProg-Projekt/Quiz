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

        //addEventListener für speichern --> nur: section.querySelector
        let speichern = section.querySelector(".save");
        speichern.addEventListener("click", () => this._saveVocab());

        //EventListener für löschen
        let del = section.querySelector(".delete");
        del.addEventListener("click",() => this._deleteVocab());

//TEST
        let input = section.querySelector(".form-control");
        input.disabled = true;


        //EventListener für anzuzeigen
        //let show = document.addEventListener("click",() => this._showVocab());

        //EventListener für bearbeiten
        //let edit = document.addEventListener("click",() => this._editVocab());

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

            let deutsch = document.getElementById("deutsch").value;
            let englisch = document.getElementById("englisch").value;
            let notiz = document.getElementById("notiz").value;

            //Schleife, um jeden Wert durchzugehen und auf bereits vorhandene Vokabel zu überprüfen
            /*for (int i = 0; i <= database.length-1; i++){
                if (database.vokabeln.[i]."deutsch" === deutsch){ // Zurgriff ???
                    alert("Vokabel bereits vorhanden!");
                    //aus methode rausspringen
                    this._app.showVocabularyOverview();
                }
            }*/

            this._vokabeln.saveNew({
                deutsch: deutsch,
                englisch: englisch,
                notiz: notiz,
                //format: html,
            });

            this._app.showVocabularyOverview();

        //}
    }
    // zurück auf Übersicht! --> Seite wechseln!! wiee

    // Vokabel Bearbeiten
    _showVocab() {
        // --- vocab Overview muss click-Event hinzufügen, wenn click auf (overviev .<liste) --> anzeige sicht

        //Button anzeigen/verstecken
        let lösch = document.querySelector(".delete");
        del.classList.remove("invisible");

        let edit = document.querySelector(".edit");
        edit.classList.remove("invisible");

        let save = document.querySelector(".save");
        save.classList.add("invisible");


        //inputFelder.disabled = true;
        let input = document.querySelector(".form-control");
        //input.disabled = true;
        //input.setAttribute('disabled','disabled','disabled');

    }

    //einzelne Vokabel löschen
    async _deleteVocab() {
        alert("Wirklich löschen??");

        // --in database.js löschen --> wie bekomme ich id? und
         delete(4);
         let vok = await this._vokabeln.search();
         console.log("Datenbank initialisieren, Anzahl Vokabeln:", vok.length);
         console.log(vok);

        // zurück auf Übersicht
        this._app.showVocabularyOverview();
    }
}

export default VocabularyDisplayEdit;
