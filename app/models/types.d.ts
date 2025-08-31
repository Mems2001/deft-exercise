type OpenDB = Promise<IDBDatabase>

interface SuccessReponse {
    status: 200 | 201,
    data: any
}

interface ErrorResponse {
    status: 400 | 404 | 500,
    message: string,
    error?: any
}