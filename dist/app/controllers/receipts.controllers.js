"use strict";
async function postReceipt(body) {
    try {
        const res = await createReceipt(body);
        await updateInventory(body);
        if (res) {
            const response = {
                data: res,
                status: 201
            };
            return response;
        }
        else {
            const response = {
                message: "Receipt not created",
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
