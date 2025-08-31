async function getAllArticles():Promise<SuccessReponse | ErrorResponse> {

    try {
        const res = await findAllArticles()

        if (res) {
            const response:SuccessReponse = {
                data: res,
                status: 200
            }
            return response
        } else {
            const response:ErrorResponse = {
                message: "Articles not found",
                status: 404
            }
            return response
        }
        
    } catch (err) {
        const response:ErrorResponse = {
                message: "Server Error",
                status: 500,
                error: err
            }
        return response
    }
}

async function postInventory(body:any):Promise<SuccessReponse | ErrorResponse> {
    try {
        const res = await createInventory(body)

        if (res) {
            const response:SuccessReponse = {
                data: res,
                status: 201
            }
            return response
        } else {
            const response:ErrorResponse = {
                message: "Inventory not created",
                status: 400
            }
            return response
        }
    } catch (error) {
        const response:ErrorResponse = {
                message: "Server Error",
                status: 500,
                error
            }
        return response
    }
}

async function getInventoryFile():Promise<SuccessReponse | ErrorResponse > {
    try {
        const file = await exportInventory()

        if (file) {
            const response:SuccessReponse = {
                    data: file,
                    status: 200
                }
            return response
        } else {
            const response:ErrorResponse = {
                message: "File not created",
                status: 400
            }
            return response
        }
    } catch (error) {
        const response:ErrorResponse = {
                message: "Server Error",
                status: 500,
                error
            }
        return response
    }
}