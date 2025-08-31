"use strict";
function downloadFile(file, filename) {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
class ArticlesServices {
    static async getAllArticles() {
        try {
            const res = await simulateRequest("api/articles", "GET");
            console.log("Articles:", res);
            return res.data;
        }
        catch (error) {
            throw new Error(`HTTP error! error: ${error.message}`);
        }
    }
    static async postInventory(body) {
        try {
            const res = await simulateRequest("api/articles/inventory", "POST", body);
            console.log("Inventory:", res);
            return res.data;
        }
        catch (error) {
            throw new Error(`HTTP error! error: ${error.message}`);
        }
    }
    static async downloadInventory() {
        try {
            const file = await simulateRequest("api/articles/inventory", "GET");
            console.log("File:", file);
            return downloadFile(file.data, "updated-inventory.txt");
        }
        catch (error) {
            throw new Error(`HTTP error! error: ${error.message}`);
        }
    }
}
window.ArticlesServices = ArticlesServices;
