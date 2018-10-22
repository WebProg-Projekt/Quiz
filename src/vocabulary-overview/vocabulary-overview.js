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

    async onShow() {
        // Anzuzeigende HTML-Elemente ermitteln
        let section = document.querySelector("#vocabulary-overview").cloneNode(true);
    	  let ulElement = section.querySelector("#Liste");

        //Vokabeln auslesen und anzeigen
        let vokabeln = await this._vokabeln.search("");
        this._showVokabeln(vokabeln, ulElement);

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
    async onLeave(goon) {
        return true;
    }

    /**
     * @return {String} Titel für die Titelzeile des Browsers
     */
    get title() {
        return "Übersicht";
    }

    /**
     * List mit Vokabeln anzeigen.
     */
    _showVokabeln(vokabeln, ulElement) {
      return; // TODO: Methode ausprogrammieren

      ulElement.innerHTML = "";

      vokabeln.forEach(vokabel => {
        let liElement = document.createElement("li");
        liElement.textContent = `${vokabel.deutsch} (${vokabel.englisch})`;
        ulElement.appendChild(liElement);
      });
    }

}

export default VocabularyOverview;
