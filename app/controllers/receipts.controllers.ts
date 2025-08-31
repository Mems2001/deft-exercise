async function postReceipt(body:Cart):Promise<SuccessReponse | ErrorResponse> {
    try {
        const res = await createReceipt(body)
        await updateInventory(body)

        if (res) {
            const response:SuccessReponse = {
                data: res,
                status: 201
            }
            return response
        } else {
            const response:ErrorResponse = {
                message: "Receipt not created",
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