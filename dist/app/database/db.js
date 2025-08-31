"use strict";
const DB_NAME = "JerrysMartDB";
const DB_VERSION = 1;
/**
 * This function's purpose is to init an IndexDB at the browser.
 * @returns {OpenDB} A promise which if resolved, creates de DB.
 */
function openDB() {
    return new Promise((resolve, reject) => {
        // DB creation
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            // Articles Store
            if (!db.objectStoreNames.contains("articles")) {
                const articulosStore = db.createObjectStore("articles", {
                    keyPath: "id",
                    autoIncrement: false,
                });
                articulosStore.createIndex("item", "item", { unique: false });
                articulosStore.createIndex("tax_status", "tax_status", { unique: false });
            }
            // Store de Carritos de compra
            if (!db.objectStoreNames.contains("carts")) {
                const carritosStore = db.createObjectStore("carts", {
                    keyPath: "id",
                    autoIncrement: true,
                });
                carritosStore.createIndex("usuarioId", "usuarioId", { unique: false });
            }
            // Store de Recibos de venta
            if (!db.objectStoreNames.contains("recibos")) {
                const recibosStore = db.createObjectStore("recibos", {
                    keyPath: "id",
                    autoIncrement: true,
                });
                recibosStore.createIndex("usuarioId", "usuarioId", { unique: false });
                recibosStore.createIndex("fecha", "fecha", { unique: false });
            }
        };
        request.onsuccess = (event) => {
            const db = event.target.result;
            resolve(db);
        };
        request.onerror = (event) => {
            const error = event.target.error;
            reject(error);
        };
    });
}
window.openDB = openDB;
