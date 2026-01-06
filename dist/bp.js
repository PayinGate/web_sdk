"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gateway = exports.BASE_URL = void 0;
const transactions_1 = require("./transactions/transactions");
exports.BASE_URL = "http://localhost:3000";
class Gateway {
    constructor({ apiKey, timeout = 5000 }) {
        if (!apiKey || typeof apiKey !== 'string') {
            throw new Error('API key must be a non-empty string');
        }
        this.apiKey = apiKey;
        this.timeout = timeout;
        this.baseurl = exports.BASE_URL;
        this.Transaction = new transactions_1.GatewayTransaction(this);
    }
    async makeRequest(endpoint, data, requestType) {
        const requestOptions = {
            method: requestType,
            headers: {
                'Authorization': `x-api-key ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            signal: AbortSignal.timeout(this.timeout),
        };
        if (requestType === "POST") {
            requestOptions['body'] = JSON.stringify(data);
        }
        const response = await fetch(`${this.baseurl}${endpoint}`, requestOptions);
        const rJson = await response.json();
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}, ${JSON.stringify(rJson)}`);
        }
        return rJson;
    }
}
exports.Gateway = Gateway;
// use public api key
class GatewayError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
//# sourceMappingURL=bp.js.map