"use strict";
async function getAllArticles() {
    try {
        const res = await findAllArticles();
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
}
async function postInventory(body) {
    try {
        const res = await createInventory(body);
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
}
async function getInventoryFile() {
    try {
        const file = await exportInventory();
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
}
