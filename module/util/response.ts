import { Errors } from "moleculer";

export const success = (message: string = "Success", data: any = null, httpCode: number = 200) => {
    return {
        message,
        code: httpCode,
        data,
    };
};

export const error = (message: string = "Error", data: any = null, httpCode: number = 400) => {
    return new Errors.MoleculerServerError(message, httpCode, message, data);
};