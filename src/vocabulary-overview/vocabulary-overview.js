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

    async onShow() {
        // Anzuzeigende HTML-Elemente ermitteln
        let section = document.querySelector("#vocabulary-overview").cloneNode(true);
    	  //let ulElement = section.querySelector("#Liste");
        //Vokabeln auslesen und anzeigen
        //let vokabeln = await this._vokabeln.search("");
        //this._showVokabeln(vokabeln, ulElement);

        let order = "deutsch";
        let query = "";

        let vokabeln = await this._vokabeln.searchVokabeln(query, order);
        let ul = section.querySelector(".Liste");
        console.log(ul);
        this.showList(vokabeln, order, ul);

        //Eventlistener zum Sortieren
        let buttonSort = section.querySelector(".sortieren");
        buttonSort.addEventListener("click",() => this._sortListe(buttonSort, vokabeln));

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

    // Liste mit Vokabeln anzeigen.
    /*_showVokabeln(vokabeln, ulElement) {
      return; // TODO: Methode ausprogrammieren

      ulElement.innerHTML = "";

      vokabeln.forEach(vokabel => {
        let liElement = document.createElement("li");
        liElement.textContent = `${vokabel.deutsch} (${vokabel.englisch})`;
        ulElement.appendChild(liElement);
      });
    }*/




    /**
     * Diese Methode nimmt die von searchVokabeln() generierte Liste mit Vokabeln
     * entgegen und zeigt sie auf der Seite an. Hierfür muss der Methode über
     * den Parameter groupBy einer von folgenden beiden Strings mitgegeben
     * werden:
     *
     *   * "deutsch": Gruppierung anhand erstem Buchstaben der deutschen Bezeichnung
     *   * "englisch": Gruppierung anhand erstem Buchstaben der englischen Bezeichnung
     *
     * Im Parameter parentNode muss das <ul>-Element übergeben werden, in
     * welches die Listeneinträge eingefügt werden sollen.
     *
     * @param {Array} vokabeln Liste der darzustellenden Vokabeln
     * @param {String} groupBy Kriterium für die Zwischenüberschriften
     * @param {HTMLNode} parentNode <ul>-Element der Liste
     */
    showList(vokabeln, groupBy, parentNode) {
        parentNode.innerHtml = "";

        if (vokabeln.length < 1) {
            // Hinweistext, wenn noch keine Songs vorhanden sind
            parentNode.innerHtml += `
                <li>
                    <div class="padding no-data">
                        Noch keine Texte vorhanden
                    </div>
                </li>
            `;
        } else {
            // Zwischenüberschriften und Songtexte
            let currentGroup = "";

            vokabeln.forEach(vokabel => {
                // Zwischenüberschrift zur Gruppierung
                let vokabelGroup1 = "";
                let vokabelGroup2 = "";

                if (groupBy === "deutsch") {
                    vokabelGroup1 = vokabel.deutsch.trim()[0].toUpperCase();
                    vokabelGroup2 = vokabelGroup1;
                } else {
                    vokabelGroup1 = vokabel.englisch.trim();
                    vokabelGroup2 = vokabelGroup1.toUpperCase();
                }

                if (currentGroup != vokabelGroup2) {
                    currentGroup = vokabelGroup1;

                    let liGroup = document.createElement("li");
                    liGroup.dataset.sectionDeutsch = currentGroup;

                    let divGroup = document.createElement("div");
                    divGroup.classList.add("section-deutsch");
                    divGroup.textContent = currentGroup;

                    parentNode.appendChild(liGroup);
                    liGroup.appendChild(divGroup);

                    //console.log(vokabel["id"]);
                    //button.addEventListener("click", () => this._app.showSongDisplayEdit(vokabel["id"], "display" ));
                    //button.addEventListener("click", () => alert ("hallo"));
                }

                //Vokabel einfügen in html
                let liVokabel = document.createElement("li");
                liVokabel.classList.add("entry");
                liVokabel.dataset.vokabelDeutsch = vokabel.deutsch.trim();
                liVokabel.dataset.vokabelEnglisch = vokabel.englisch.trim();

                let divDeutsch = document.createElement("div");
                divDeutsch.classList.add("vokabel-deutsch");
                divDeutsch.textContent = vokabel.deutsch.trim();

                let divEnglisch = document.createElement("div");
                divEnglisch.classList.add("vokabel-englisch");
                divEnglisch.textContent = vokabel.englisch.trim();

                let button = document.createElement("button");
                var buttontext = document.createTextNode("anzeigen");
                button.appendChild(buttontext);
                liVokabel.classList.add("button-vokabel");
                button.addEventListener("click", () => this._app.showVocabularyDisplayEdit(vokabel["id"],"display" ));

                parentNode.appendChild(liVokabel);
                liVokabel.appendChild(divDeutsch);
                liVokabel.appendChild(divEnglisch);
                liVokabel.appendChild(button);
            });
        }
    }

    _sortListe(buttonSort, vokabeln){
      if (buttonSort.buttontext = "Sortierung englisch"){
        //sortieren nach englisch
        vokabeln[englisch].sort();
        setbuttontext="Sortierung deutsch";
      }
      if (buttonSort.buttontext = "Sortierung deutsch"){
        //sortieren nach deutsch
      }
    }


}

export default VocabularyOverview;
