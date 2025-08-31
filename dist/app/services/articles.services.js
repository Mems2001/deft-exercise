"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function findAllArticles() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!window.db)
            throw new Error("DB not initialized");
        const tx = window.db.transaction("articles", "readonly");
        const store = tx.objectStore("articles");
        return new Promise((resolve, reject) => {
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    });
}
function createInventory(files) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!window.db)
            throw new Error("DB not initialized");
        let totalArticles = [];
        for (const file of files) {
            const text = yield file.text();
            console.log(text);
            const articles = parseInventory(text);
            console.log(articles);
            totalArticles = [...totalArticles, ...articles];
        }
        return new Promise((resolve, reject) => {
            const tx = window.db.transaction("articles", "readwrite");
            const store = tx.objectStore("articles");
            for (const article of totalArticles) {
                const req = store.add(Object.assign({ id: generateUUID() }, article));
                req.onerror = () => reject(req.error);
            }
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => reject(tx.error);
        });
    });
}
/**
 * Converts an articles array from the DB into a .txt file ready to be sent to the controller, then the front-end, to finally be downloaded.
 * @returns
 */
function exportInventory() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!window.db)
            throw new Error("DB not initialized");
        try {
            const allArticles = yield findAllArticles();
            const lines = allArticles.map(a => `${a.item}: ${a.quantity}, $${a.regular_price.toFixed(2)}, $${a.member_price.toFixed(2)}, ${a.tax_stratus}`);
            const fileContent = lines.join("\n");
            const txtFile = stringToTxtFile(fileContent);
            return txtFile;
        }
        catch (error) {
            return null;
        }
    });
}
window.articlesService = {
    findAllArticles,
    createInventory,
    exportInventory
};
