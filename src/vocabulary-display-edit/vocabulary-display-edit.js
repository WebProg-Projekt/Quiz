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
        console.log(this._vokabeln);
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

        return {
        className: "vocabulary-display-edit",
        topbar: section.querySelectorAll("header > *"),
        main: section.querySelectorAll("main > *"),
        };

        //Event Handler nach Single Page Router nicht mehr notwendig
        // Event Handler registrieren
        //let overviewItem = section.querySelector("header .item.overview");

        //overviewItem.addEventListener("click", () => {
        //    this._app.showSongOverview();
        //})

        // Ergebnis zurückliefern
        //return content;
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

    // Button, zum Abbrechen
    abbrechen() {
    //let abbrechen = () => document.getElementById("abbr").addEventListener("click", vocabularyOverview.onShow());
    }
    // Button, um zu speichern
    //saveVocab() {
        //let save = document.getElementById("sp").addEventListener("click", () => {
        // neue VokabelDatenbank ---- wird bei jedem speichern ein neues Objekt der DB erzeugt?
            //let dB = async () => {
                //let vokabeln = new Database.Vokabeln();


                // neuen Eintrag speichern
                /*let speichern = () => {
                    let deutsch_ = document.getElementById("deutsch").value;
                    let englisch_ = document.getElementById("englisch").value;
                    let notiz_ = document.getElementById("notiz").value;

                    vokabeln.saveNew({
                            deutsch: deutsch_;
                            englisch: englisch_;
                            notiz: notiz_;
                            format: ???
                            data: ???
                            }
                        );
                }
            }
            // zurück auf Übersicht! --> Seite wechseln!! wiee
        }
    }


*/
    // Vokabel Bearbeiten
    editVocab() {
        // --- vocab Overview muss click-Event hinzufügen

        let editElement = document.getElementById("edit");
            editElement.classList.remove("hidden");
        let spElement = document.getElementById("sp");
            spElement.classList.add("hidden");
        let deleteElement = document.getElementById("delete");
            deleteElement.classList.remove("hidden");
        //let abbrElement = document.getElementById("abbr");
    }

    //einzelne Vokabel löschen
    deleteVocab() {
        alert("Wirklich löschen??");
        let del = document.getElementById("delete");
        del.addEventListener("click", Vokabeln.delete()); // --in database.js löschen
    }
}

export default VocabularyDisplayEdit;
