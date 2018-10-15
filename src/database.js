"use strict";

import Dexie from "dexie/dist/dexie.js";

// Datenbankdefinition:
//
//   * ++id = Automatisch Hochgezählter Datenbankschlüssel
//   * englisch, deutsch = Indexfelder für WHERE-Abfragen und die Sortierung
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
     *     data: "HTML-String",
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
        return database.vokabel.get(id);
    }

        /** Suchfunktion:
     * Gibt eine Liste mit allen Vokabeln zurück, deren deutsche oder englische
     * Bedeutung den gesuchten Wert enthalten.
     *
     * @param  {String}  query Gesuchter Titel oder Künstler
     * @return {Promise} Asynchrones Promise-Objekt mit dem Suchergebnis
     */
    async search(query) {
        if (!query) query = "";
        query = query.toUpperCase();

        let result = database.vokabeln.filter(vokabel => {
            let deutsch = songtext.deutsch.toUpperCase();
            let englisch  = songtext.englisch.toUpperCase();
            return deutsch.search(query) > -1 || englisch.search(query) > -1;
        });

        return result.toArray();
    }
}

export default {
    database,
    Vokabeln,
};
