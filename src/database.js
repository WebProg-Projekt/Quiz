"use strict";

import Dexie from "dexie/dist/dexie.js";

// Datenbankdefinition:
//
//   * ++id = Automatisch Hochgezählter Datenbankschlüssel
//   * englisch, deutsch, notiz = Indexfelder für WHERE-Abfragen und die Sortierung
//   * Alle anderen Felder müssen nicht deklariert werden!
//   * Vgl. http://dexie.org/docs/API-Reference
let database = new Dexie("VokabuLearn");

database.version(1).stores({
    vokabeln: "++id, deutsch, englisch, notiz",
});

/**
 * Datenbankzugriffsklasse für Songtexte. Diese Klasse bietet verschiedene
 * Methoden, um Songtexte zu speichern und wieder auszulesen. Im Hintergrund
 * wird hierfür Dexie zur lokalen Speicherung im Browser genutzt.
 */
class Vokabeln {

        /****
     * Eine neue Vokabel speichern oder eine vorhandene Vokabel
     * aktualisieren. Das Vokabel-Objekt sollte hierfür folgenden Aufbau
     * besitzen:
     *
     * {
     *     deutsch: "deutsche Eingabe",
     *     englisch: "englische Eingabe",
           notiz: "Notiz",
     *     format: "html",
     * }
     *
     * @param  {Object}  vokabel Zu speichernde Vokabel
     * @return {Promise} Asynchrones Promise-Objekt
     */
    async saveNew(vokabel) {
        return database.vokabeln.add(vokabel);
    }


        /**
     * Bereits vorhandene Vokabel aktualisieren.
     * @param  {Object}  vokabel Zu speichernde Vokabel
     * @return {Promise} Asynchrones Promise-Objekt
     */
    async update(vokabel) {
        return database.vokabeln.put(vokabel);
    }


    /**
     * Vorhandene Vokabel anhand ihrer ID löschen.
     * @param  {String}  id ID der zu löschenden Vokabel
     * @return {Promise} Asynchrones Promise-Objekt
     */
    async delete(id) {
        return database.vokabeln.delete(id);
    }

    /**
     * Löscht alle Songtexte!
     * @return {Promise} Asynchrones Promise-Objekt
    async clear() {
        return database.songtexts.clear();
    }
    */


     /**
     * Vorhandene Vokabel anhand ihrer ID auslesen.
     * @param  {String}  id ID der zu lesenden Vokabel
     * @return {Promise} Asynchrones Promise-Objekt mit der Vokabel
     */
    async getById(id) {
        return database.vokabeln.get(id);
    }

     /** Suchfunktion:
     * Gibt eine Liste mit allen Vokabeln zurück, deren deutsche oder englische
     * Bedeutung den gesuchten Wert enthalten.
     *
     * @param  {String}  query Gesuchte deutsche oder englische Bedeutung
     * @return {Promise} Asynchrones Promise-Objekt mit dem Suchergebnis
     */
    async search(query) {
        if (!query) query = "";
        query = query.toUpperCase();

        let result = database.vokabeln.filter(vokabel => {
            let deutsch = vokabel.deutsch.toUpperCase();
            let englisch  = vokabel.englisch.toUpperCase();
            return deutsch.search(query) > -1 || englisch.search(query) > -1;
        });

        return result.toArray();
    }



    /**
    * Diese Methode greift auf die Datenbank zu und sucht die gespeicherten
    * Vokabeln. Optional kann ein Suchbegriff mitgegeben werden, der innerhalb
    * des deutschen oder des englischen vorkommen muss. Ebenso kann
    * einer von folgenden Werten mitgegeben werden, um die Ergebnisliste zu
    * sortieren:
    *
    *   * "deutsch": Sortierung nach deutsch
    *   * "englisch": Sortierung nach englisch
    *
    * @param  {String} query Suchbegriff (optional)
    * @param  {String} sort Sortierung (optional)
    * @return {Array} Liste der gefundenen vokabeln
    */
    async searchVokabeln(query, sort) {
        // Vokabeln suchen
        let vokabeln = new Vokabeln();
        let result = await vokabeln.search(query);

        // Ergebnis sortieren
        result.sort((lhs, rhs) => {
            let resultEnglisch = lhs.englisch.localeCompare(rhs.englisch);
            let resultDeutsch = lhs.deutsch.localeCompare(rhs.deutsch);

            if (sort === "englisch") {
                // Sortierung nach Englisch und Songtitel
                if (resultEnglisch != 0) {
                    return resultEnglisch;
                } else {
                    return resultDeutsch;
                }
            } else {
                // Sortierung nach Deutsch und Künstler
                if (resultDeutsch != 0) {
                    return resultDeutsch;
                } else {
                    return resultEnglisch;
                }
            }
        });

        return result;
    }




}

export default {
    database,
    Vokabeln,
};
