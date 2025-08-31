"use strict";
async function findAllArticles() {
    if (!window.db)
        throw new Error("DB not initialized");
    const tx = window.db.transaction("articles", "readonly");
    const store = tx.objectStore("articles");
    return new Promise((resolve, reject) => {
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}
async function findArticleByItem(item) {
    if (!window.db)
        throw new Error("DB not initialized");
    const tx = window.db.transaction("articles", "readonly");
    const store = tx.objectStore("articles");
    const index = store.index("item");
    return new Promise((resolve, reject) => {
        const req = index.get(item);
        console.log(req);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}
async function createInventory(files) {
    if (!window.db)
        throw new Error("DB not initialized");
    let totalArticles = [];
    for (const file of files) {
        const text = await file.text();
        console.log(text);
        const articles = parseInventory(text);
        console.log(articles);
        totalArticles = [...totalArticles, ...articles];
    }
    return new Promise((resolve, reject) => {
        const tx = window.db.transaction("articles", "readwrite");
        const store = tx.objectStore("articles");
        for (const article of totalArticles) {
            const req = store.add({ id: generateUUID(), ...article });
            req.onerror = () => reject(req.error);
        }
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}
/**
 * Converts an articles array from the DB into a .txt file ready to be sent to the controller, then the front-end, to finally be downloaded.
 * @returns
 */
async function exportInventory() {
    if (!window.db)
        throw new Error("DB not initialized");
    try {
        const allArticles = await findAllArticles();
        const lines = allArticles.map(a => `${a.item}: ${a.quantity}, $${a.regular_price.toFixed(2)}, $${a.member_price.toFixed(2)}, ${a.tax_status}`);
        const fileContent = lines.join("\n");
        const txtFile = stringToTxtFile(fileContent);
        return txtFile;
    }
    catch (error) {
        return null;
    }
}
async function updateInventory(cart) {
    if (!window.db)
        throw new Error("DB not initialized");
    const tx = window.db.transaction("articles", "readwrite");
    const store = tx.objectStore("articles");
    const index = store.index("item");
    for (const c of cart.items) {
        const req = index.get(c.item);
        await new Promise((resolve, reject) => {
            req.onsuccess = () => {
                const inventoryItem = req.result;
                if (c.quantity >= inventoryItem.quantity)
                    store.delete(inventoryItem.id);
                else {
                    inventoryItem.quantity -= c.quantity;
                    store.put(inventoryItem);
                }
                resolve();
            };
            req.onerror = () => reject(req.error);
        });
    }
    return new Promise((resolve, reject) => {
        tx.oncomplete = async () => {
            const updatedInventory = await findAllArticles();
            resolve(updatedInventory);
        };
        tx.onerror = () => reject(tx.error);
    });
}
window.articlesService = {
    findAllArticles,
    createInventory,
    exportInventory
};
