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
function createReceipt(receipt) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!window.db)
            throw new Error("DB not initialized");
        return new Promise((resolve, reject) => {
            const tx = window.db.transaction("sells", "readwrite");
            const store = tx.objectStore("sells");
            const req = store.add(receipt);
            req.onsuccess = () => resolve(true);
            req.onerror = () => reject(req.error);
            tx.onerror = () => reject(tx.error);
        });
    });
}
function findAllReceipts() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!window.db)
            throw new Error("DB not initialized");
        return new Promise((resolve, reject) => {
            const tx = window.db.transaction("sells", "readonly");
            const store = tx.objectStore("sells");
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    });
}
/**
 * Converts all receipts into a downloadable .txt file
 */
function exportReceipt() {
    if (!window.db)
        throw new Error("DB not initialized");
}
window.sellsService = {
    createReceipt,
    findAllReceipts,
    exportReceipt
};
