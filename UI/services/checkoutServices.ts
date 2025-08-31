class CheckoutServices {
    static async generateReceipt (cart:Cart) {
        try {
            const res = await simulateRequest("api/checkout/generate", "POST", cart)

            console.log("Receipt:" , res)

            return downloadFile(res.data, res.data.name)
        } catch (error:any) {
            throw new Error(`HTTP error! error: ${error.message}`)
        }
    }
}