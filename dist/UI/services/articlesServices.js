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
    static getAllArticles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield simulateRequest("api/articles", "GET");
                console.log("Articles:", res);
                return res.data;
            }
            catch (error) {
                throw new Error(`HTTP error! error: ${error.message}`);
            }
        });
    }
    static postInventory(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield simulateRequest("api/articles/inventory", "POST", body);
                console.log("Inventory:", res);
                return res.data;
            }
            catch (error) {
                throw new Error(`HTTP error! error: ${error.message}`);
            }
        });
    }
    static downloadInventory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield simulateRequest("api/articles/inventory", "GET");
                console.log("File:", file);
                return downloadFile(file.data, "updated-inventory.txt");
            }
            catch (error) {
                throw new Error(`HTTP error! error: ${error.message}`);
            }
        });
    }
}
window.ArticlesServices = ArticlesServices;
