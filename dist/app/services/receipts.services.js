"use strict";
async function createReceipt(cart) {
    if (!window.db)
        throw new Error("DB not initialized");
    const receiptItems = await Promise.all(cart.items.map(i => cartItemToReceiptItem(i)));
    return new Promise((resolve, reject) => {
        const tx = window.db.transaction("sells", "readwrite");
        const store = tx.objectStore("sells");
        const receipt = {
            date: new Date(),
            items_amount: cart.items.length,
            subtotal: cart.subtotal,
            tax: cart.tax,
            total: cart.total,
            cash: cart.cash,
            change: cart.change,
            items: receiptItems,
            savings: cart.savings
        };
        const req = store.add(receipt);
        console.log("for creation", receipt);
        req.onsuccess = () => {
            resolve(receiptToTxt({ id: Number(req.result), ...receipt }));
        };
        req.onerror = () => reject(req.error);
        tx.onerror = () => reject(tx.error);
    });
}
async function findAllReceipts() {
    if (!window.db)
        throw new Error("DB not initialized");
    return new Promise((resolve, reject) => {
        const tx = window.db.transaction("sells", "readonly");
        const store = tx.objectStore("sells");
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
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
