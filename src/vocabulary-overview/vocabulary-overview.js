"use strict";

import stylesheet from "./vocabulary-overview.css";

/**
 * View mit der Übersicht der vorhandenen Songs.
 */
class VocabularyOverview {
    /**
     * Konstruktor,
     * @param {Objekt} app Zentrales App-Objekt der Anwendung
     */
    constructor(app, vokabeln) {
        this._app = app;
        this._vokabeln = vokabeln;
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
        let section = document.querySelector("#vocabulary-overview").cloneNode(true);

        //Vokabeln auslesen aufrufen
        let anzeigen;
        this.anzeigen._onRead();
        //Vokabeln dynamisch anzeigen
        let liElement = document.createElement("li"); //ID !
        let ulElement = document.getElementById("Liste");
        ulElement.appendChild(liElement)
        //anzeigen = document.querySelectorAll("Liste");

        return {
        className: "vocabulary-overview",
        topbar: section.querySelectorAll("header > *"),
        main: section.querySelectorAll("main > *"),
        };

        //Event Handler nach Single Page Router nicht mehr notwendig
        // Event Handler registrieren
        //let newSongItem = section.querySelector("header .item.new-song");

        //newSongItem.addEventListener("click", () => {
            //this._app.showSongDisplayEdit("", "new");
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
        return "Übersicht";
    }

    // Datenbankinformationen auszulesen
    onRead(){
        anzeigen = this._anzeigen.getById();
    }

}

export default VocabularyOverview;
