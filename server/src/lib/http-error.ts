export class HttpError extends Error {
    status: number;
    type?: string;

    constructor(status: number, message: string, type?: string) {
        super(message);
        this.status = status;
        this.message = message;
        if (type) this.type = type;
    }

    toJSON() {
        return {
            status: this.status,
            type: this.type,
            message: this.message,
        };
    }
}
