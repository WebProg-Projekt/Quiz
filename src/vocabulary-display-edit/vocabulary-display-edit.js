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
    async onShow() {
        // Anzuzeigende HTML-Elemente ermitteln
        let section = document.querySelector("#vocabulary-display-edit").cloneNode(true);

        //EventListener für anzeigen
        //let show = section.addEventListener("click",() => this._showVocab());

        //EventListener für löschen
        let del = section.querySelector(".delete");
        del.addEventListener("click",() => this._deleteVocab());

        //EventListener für bearbeiten
        //let edit = document.addEventListener("click",() => this._editVocab());

        //EventListener für aktualisieren
        let upd = section.querySelector(".update");
        upd.addEventListener("click",() => this._updateVocab());

        //addEventListener für speichern --> nur: section.querySelector
        let speichern = section.querySelector(".save");
        speichern.addEventListener("click", () => this._saveVocab());



//TEST

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
    async onLeave(goon) {
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

    _editVocab(){

        let edit = document.querySelector(".edit");
        edit.classList.add("invisible");

        let upd = document.querySelector(".update");
        upd.classList.remove("invisible");

        let del = document.querySelector(".delete");
        del.classList.add("invisible");

        let sp = document.querySelector(".save");
        sp.classList.add("invisible");

        //Inputfelder befüllen mit bisherigem Wert aus dexie
        //document.querySelector(".deutsch").value = database.[id].deutsch ; --> muss String sein

    }
    _updateVocab(){
        //Update-Button einblenden
        let update = section.querySelector(".update");
        update.classList.remove("invisible");

        //Save-Button ausblenen
        let save = section.querySelector(".save");
        save.classList.add("invisible");

        // aktuelle Werte nehmen und updaten
        let deutsch = document.getElementById("deutsch").value;
        let englisch = document.getElementById("englisch").value;
        let notiz = document.getElementById("notiz").value;

        /*
        this._vokabeln.update(
            {
                id: //....,
                deutsch: deutsch,
                englisch: englisch,
                notiz: notiz,
                //format: html,
            }
        );*/
    }

    // Button, um zu speichern
    _saveVocab() {
            let deutsch = document.querySelector(".deutsch").value;
            let englisch = document.querySelector(".englisch").value;
            let notiz = document.querySelector(".notiz").value;

            if (deutsch != "" || englisch != ""){

                // zurück zu input!!


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
                // zurück auf Übersicht
                //this._app.showVocabularyOverview();
                // danach ist seite inaktiv?!

            } else {
                alert("alle angaben ausfüllen");
            }


    }

    // Vokabel Bearbeiten
    _showVocab() {
        // --- vocab Overview muss click-Event hinzufügen, wenn click auf (overviev .<liste) --> anzeige sicht
        // übergabe der id

        //Button anzeigen/verstecken
        let del = document.querySelector(".delete");
        del.classList.remove("invisible");

        let edit = document.querySelector(".edit");
        edit.classList.remove("invisible");

        let save = document.querySelector(".save");
        save.classList.add("invisible");

        //Eingabefelder ausgrauen
        let deutsch = document.querySelector(".deutsch");
        let englisch = document.querySelector(".englisch");
        let notiz = document.querySelector(".notiz");

        englisch.disabled = true;
        deutsch.disabled = true;
        notiz.disabled = true;

        //Beschriftung des Placeholders im label neu setzen
        document.querySelector(".deutsch").placeholder = "BlaBLa";


    }

    //einzelne Vokabel löschen
    async _deleteVocab() {

        alert("Wirklich löschen??");

        // --in database.js löschen --> wie bekomme ich id?
         //let id = wie bekomme ich denn Info über Vokabel hinter Button??
         delete(4);
         let vok = await this._vokabeln.search();
         console.log("Datenbank initialisieren, Anzahl Vokabeln:", vok.length);
         console.log(vok);

        // zurück auf Übersicht
        this._app.showVocabularyOverview();
    }
}

export default VocabularyDisplayEdit;
