"use strict";
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
/**
 * This function obtains an Array of Article type elements parsing them from each line of a .txt inventory file.
 * @param {string} txt The string obtained from the .txt file.
 * @returns {Article[]} An Array of Articles
 */
function parseInventory(txt) {
    const lines = txt.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    const articles = lines.map(line => {
        let [itemNquantity, regular_priceA, member_priceA, tax_statusA] = line.split(",");
        if (!(itemNquantity && regular_priceA && member_priceA && tax_statusA))
            throw new Error(`Incomplete article at: ${line}`);
        let [itemA, quantityA] = itemNquantity.split(':');
        const item = itemA.trim();
        const quantity = Number(quantityA.trim());
        const regular_price = Number(regular_priceA.trim().replace("$", ""));
        const member_price = Number(member_priceA.trim().replace("$", ""));
        const tax_status = tax_statusA.trim();
        return {
            id: generateUUID(),
            item,
            quantity,
            regular_price,
            member_price,
            tax_status,
        };
    });
    return articles;
}
/**
 * Use it to convert a string to a .txt file, ideal to send back the inventory.
 * @param content
 * @param filename
 * @returns
 */
function stringToTxtFile(content, filename = "updated-inventory.txt") {
    const blob = new Blob([content], { type: "text/plain" });
    return new File([blob], filename, { type: "text/plain" });
}
