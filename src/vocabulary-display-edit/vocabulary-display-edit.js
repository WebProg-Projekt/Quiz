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
        //let show = document.querySelector(".test");
        //show.addEventListener("click",() => this._showVocab());


        //EventListener für bearbeiten
        //let edit = document.addEventListener("click",() => this._editVocab());

        //EventListener für aktualisieren
        let upd = section.querySelector(".update");
        upd.addEventListener("click",() => this._updateVocab());

        let abbrechen = section.querySelector(".quit");
        abbrechen.addEventListener("click", ()=> this._app.showVocabularyOverview());

        //addEventListener für speichern --> nur: section.querySelector
        let speichern = section.querySelector(".save");
        speichern.addEventListener("click", () => this._saveVocab());

        //der "display"-mode wird in onShow der Klasse Overview ausgerufen
        //edit-mode aufrufen
        let edit = section.querySelector(".edit");
        edit.addEventListener("click", () => this._app.showVocabularyDisplayEdit(1, "edit"));

        console.log(this._mode);

        if (this._mode === "display") {
            let lösch = section.querySelector(".delete");
            lösch.classList.remove("invisible");

            let save = section.querySelector(".save");
            save.classList.add("invisible");

            let edit = section.querySelector(".edit");
            edit.classList.remove("invisible");

            //Eingabefelder ausgrauen
            let deutsch = section.querySelector(".deutsch");
            let englisch = section.querySelector(".englisch");
            let notiz = section.querySelector(".notiz");

            englisch.disabled = true;
            deutsch.disabled = true;
            notiz.disabled = true;

            //Beschriftung des Placeholders im label neu setzen
            //section.querySelector(".deutsch").placeholder = "BlaBLa";
            //let deutsch = section.querySelector(".deutsch");
            //let vokabel = await this._vokabeln.getById("2");
            //console.log(vokabel);
            //deutsch.placeholder = vokabel["deutsch"];

            //EventListener für löschen
            let del = section.querySelector(".delete");
            del.addEventListener("click",() => this._deleteVocab());

            //get title()


        }

        if (this._mode === "edit"){
            //let upd = section.querySelector(".update");
            upd.classList.remove("invisible");

            let save = section.querySelector(".save");
            save.classList.add("invisible");



            //let quit = section.querySelector(".quit");
            //quit.addEventListener("click",() => this._app.navigate("/"));


            //Inputfelder befüllen mit bisherigem Wert aus dexie
            //let deutsch = section.querySelector(".deutsch");
            //let vokabel = await this._vokabeln.search (1);
            //deutsch.value = vokabel ["deutsch"];

            //database.[id].deutsch ; --> muss String sein
        }

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





    }
    _updateVocab(){
        // aktuelle Werte nehmen und updaten
        let deutsch = document.querySelector(".deutsch").value;
        let englisch = document.querySelector(".englisch").value;
        let notiz = document.querySelector(".notiz").value;
        //console.log(value);
        /*
        this._vokabeln.update(
            {
                id: //....,
                deutsch: deutsch,
                englisch: englisch,
                notiz: notiz,
                //format: html,
            }
        );
        */
        // aus JS auf andere Seite leiten
        this._app.navigate("/");

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

                // aus JS auf andere Seite leiten
                this._app.navigate("/");

            } else {
                alert("alle angaben ausfüllen");
            }


    }

    // Vokabel Bearbeiten
    _showVocab() {
        // --- vocab Overview muss click-Event hinzufügen, wenn click auf (overviev .<liste) --> anzeige sicht
        // übergabe der id


    }

    //einzelne Vokabel löschen
    async _deleteVocab() {

        //EventListener, ursprüngl. in Overview
        //let test = section.querySelector(".test");
        //test.addEventListener("click", () => this._app.showVocabularyDisplayEdit(1, "display"));

        //alert("Wirklich löschen??");

         //let id = wie bekomme ich denn Info über Vokabel hinter Button??
        // let id = document.querySelector("...").id = "?";

         //mit search wird ein array erzeugt, mit gleichennamigen Vokabeln
         let voc = await this._vokabeln.search("ydf");
         console.log(voc);

         for (let i=0; i<=voc.length; i++ ) {
             let id = voc[0]["id"];
             this._vokabeln.delete(id);
         }
         console.log(voc);

         let vok = await this._vokabeln.search();
         console.log("Datenbank initialisieren, Anzahl Vokabeln:", vok.length);
         console.log(vok);

         //this._app.navigate("/");
         this._app.showVocabularyOverview();
        // zurück auf Übersicht
        //this._app.navigate("/");
    }
}

export default VocabularyDisplayEdit;
