export class ApiError extends Error {
    constructor(statusCode: number) {
        super(ApiError.getErrorMessage(statusCode));
    }

    static getErrorMessage(code: number) {
        switch (true) {
            case code === 403:
                return "You don't have access to this resource!";

            case code === 404:
                return "Not found!";

            case code >= 500:
                return "Internal Server Error!"

            default:
                return "Failed!";
        }
    }
}

