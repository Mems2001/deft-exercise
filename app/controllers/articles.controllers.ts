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
