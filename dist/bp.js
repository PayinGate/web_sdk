"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayBP = void 0;
class GatewayBP {
    constructor({ apiKey, timeout = 5000 }) {
        if (!apiKey || typeof apiKey !== 'string') {
            throw new Error('API key must be a non-empty string');
        }
        this.apiKey = apiKey;
        this.timeout = timeout;
        this.baseurl = "http://localhost:3000";
    }
    async makeRequest(endpoint, data, requestType) {
        const requestOptions = {
            method: requestType,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            signal: AbortSignal.timeout(this.timeout),
        };
        if (requestType === "POST") {
            requestOptions['body'] = JSON.stringify(data);
        }
        const response = await fetch(`${this.baseurl}${endpoint}`, requestOptions);
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return await response.json();
    }
}
exports.GatewayBP = GatewayBP;
// use public api key
class GatewayError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
//# sourceMappingURL=bp.js.map