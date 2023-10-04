export class ApiError extends Error {
    constructor(statusCode: number) {

        if (!(statusCode >= 400)) {
            throw Error("You must have >= 400 statusCode to create ApiError Object!");
        }

        super(ApiError.getErrorMessage(statusCode));
    }

    static getErrorMessage(code: number) {
        switch (code) {
            case 403:
                return "You don't have access to this resource!";

            case 404:
                return "Not found!";

            default:
                return "Server Error!";
        }
    }
}

