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
function getAllArticles() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield findAllArticles();
            if (res) {
                const response = {
                    data: res,
                    status: 200
                };
                return response;
            }
            else {
                const response = {
                    message: "Articles not found",
                    status: 404
                };
                return response;
            }
        }
        catch (err) {
            const response = {
                message: "Server Error",
                status: 500,
                error: err
            };
            return response;
        }
    });
}
function postInventory(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield createInventory(body);
            if (res) {
                const response = {
                    data: res,
                    status: 201
                };
                return response;
            }
            else {
                const response = {
                    message: "Inventory not created",
                    status: 400
                };
                return response;
            }
        }
        catch (error) {
            const response = {
                message: "Server Error",
                status: 500,
                error
            };
            return response;
        }
    });
}
function getInventoryFile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const file = yield exportInventory();
            if (file) {
                const response = {
                    data: file,
                    status: 200
                };
                return response;
            }
            else {
                const response = {
                    message: "File not created",
                    status: 400
                };
                return response;
            }
        }
        catch (error) {
            const response = {
                message: "Server Error",
                status: 500,
                error
            };
            return response;
        }
    });
}
