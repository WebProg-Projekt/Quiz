"use strict";

import stylesheet from "./vocabulary-display-edit.css";
import Database from "../database.js";

 /**
  * View zur Eingabe einer neuen Vokabel, Anzeige oder zum Bearbeiten einer Vokabel.
  * "Default-View" ist der Mode "new" zur Anlage einer neuen Vokabel.
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

        let abbrechen = section.querySelector(".quit");
        abbrechen.addEventListener("click", ()=> this._app.showVocabularyOverview());

        //addEventListener, um neue Vokabel zu speichern
        let save = section.querySelector(".save");
        save.addEventListener("click", () => this._saveVocab());

        //der "display"-mode wird in onShow der Klasse Overview ausgerufen
        //edit-mode aufrufen
        let edit = section.querySelector(".edit");
        edit.addEventListener("click", () => this._app.showVocabularyDisplayEdit(this._id, "edit"));

        console.log(this._mode);

        if (this._mode === "display") {
            let lösch = section.querySelector(".delete");
            lösch.classList.remove("invisible");

            save.classList.add("invisible");

            edit.classList.remove("invisible");

            //Eingabefelder ausgrauen
            let deutsch = section.querySelector(".deutsch");
            let englisch = section.querySelector(".englisch");
            let notiz = section.querySelector(".notiz");

            //in Variable vok wird Vokabel-Objekt gespeichert, das anhand id aus overview übergeben wurde
            let vok = await this._vokabeln.getById(this._id);
            console.log(vok);

            //der Wert der Eingabefelder wird mit entprechendem Wert aus Vokabel-Objekt bestückt
            englisch.value = await vok["englisch"];
            deutsch.value = await vok["deutsch"];
            notiz.value = await vok["notiz"];

            // Eingabefelder sind inaktiv
            englisch.disabled = true;
            deutsch.disabled = true;
            notiz.disabled = true;

            //EventListener für löschen-Button --- methode _deleteVocab wird aufgerufen
            let del = section.querySelector(".delete");
            del.addEventListener("click", () => this._deleteVocab(this._id));

            //Eventlistener für Bearbeiten
            edit.addEventListener("click", () => this._editVocab(this._id));

        }

        if (this._mode === "edit"){
            let upd = section.querySelector(".update");
            upd.classList.remove("invisible");

            let save = section.querySelector(".save");
            save.classList.add("invisible");

            //EventListener für bearbeiten
            // --> Methode _editVocab wird schon in display aufgerufen

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

    async _editVocab(id){

        //
        let deutsch = document.querySelector(".deutsch");
        let englisch = document.querySelector(".englisch");
        let notiz = document.querySelector(".notiz");

        //in vok wird Vokabel-Objekt aus dexie geschrieben --> anhand id in getById
        let vok = await this._vokabeln.getById(id);

        //die Eingabefelder werden mit werten aus aktuellem Vokabel-objekt bestückt
        englisch.value = await vok["englisch"];
        deutsch.value = await vok["deutsch"];
        notiz.value = await vok["notiz"];

        //Eingabefelder wieder aktivieren
        englisch.disabled = false;
        deutsch.disabled = false;
        notiz.disabled = false;

        //EventListener für Aktualisieren-Button registrieren
        //--> Aufruf der Methode _updateVocab mit Übergabe der aktuellen id
        let update = document.querySelector(".update");
        update.addEventListener("click", () => this._updateVocab(this._id));
    }


    _updateVocab(){
        // aktuelle Werte aus Eingabefeld entnehmen
        let deutsch = document.querySelector(".deutsch").value;
        let englisch = document.querySelector(".englisch").value;
        let notiz = document.querySelector(".notiz").value;
        //console.log(value);

        // Bereits vorhandene Vokabel aktualisieren mit dynamischer Übergabe
        // Methode muss ein Vokabel-Objekt übergeben werden, id muss gleich sein
        // anhand dieser sucht methode Objekt und aktualisiert daten
        //--> ${}, um Werte in HTML zu schreiben
        this._vokabeln.update(
            {
                id: `${this._id}`,
                deutsch: `${deutsch}`,
                englisch: `${englisch}`,
                notiz: `${notiz}`,
                //format: html,
            }
        );
        // zurück zur Übersicht
        //this._app.navigate("/");
        this._app.showVocabularyOverview();

    }

    // Button, um zu speichern
    _saveVocab() {
            let deutsch = document.querySelector(".deutsch").value;
            let englisch = document.querySelector(".englisch").value;
            let notiz = document.querySelector(".notiz").value;

            if (deutsch != "" || englisch != ""){

                // zurück zu input!!

                this._vokabeln.saveNew({
                    deutsch: deutsch,
                    englisch: englisch,
                    notiz: notiz,
                    //format: html,
                });

                // aus JS auf andere Seite leiten
                this._app.showVocabularyOverview();
                this._app.navigate("/");

            } else {
                alert("Bitte alle Angaben ausfüllen!♥");
            }
    }

    //Vorhandene Vokabel anhand ihrer ID löschen. --> Methode aus Dexie
    // id wird im eventListener übergeben
    async _deleteVocab(id) {


        //TEsT um zu sehen, dass tatsächlich Voc gelöscht werden
         //let vok = await this._vokabeln.search();
         //console.log("Datenbank initialisieren, Anzahl Vokabeln:", vok.length);
         //console.log(vok);


         this._vokabeln.delete(id);

         //zurück zur Übersicht
         this._app.showVocabularyOverview();
         //this._app.navigate("/");
    }
}

export default VocabularyDisplayEdit;
