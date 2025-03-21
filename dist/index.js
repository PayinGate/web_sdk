"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gateway = void 0;
const bp_1 = require("./bp");
class Gateway extends bp_1.GatewayBP {
    constructor(config) {
        super(config);
    }
    async generateAddress(options) {
        try {
            const data = {
                transaction_id: options.id,
                reference: options.reference,
                chain: options.chain,
                coin: options.coin,
                rates: options.rates
            };
            const response = await this.makeRequest("/api/p/transaction/generate-address", data, "POST");
            const transactionDetails = response["data"];
            return transactionDetails;
        }
        catch (error) {
            throw new Error(`Error occured: ${error}`);
        }
    }
    async initializeTransaction(options) {
        try {
            const { amount } = options;
            if (amount <= 0) {
                throw new Error('Amount must be greater than zero');
            }
            const data = {
                amount: options.amount,
                currency: options.currency,
                customer: options.customer,
                metadata: options.metadata,
                callbackUrl: options.callbackUrl,
                description: options.description
            };
            const response = await this.makeRequest("/api/p/transaction/create", data, "POST");
            const transaction = response["data"];
            const transactionDetails = await this.generateAddress({ ...transaction, ...options });
            return transactionDetails;
        }
        catch (error) {
            throw new Error(`An error occured: ${error}`);
        }
    }
    async fetchRates({ from, to, amount = 0 }) {
        try {
            const response = await this.makeRequest(`/api/rate/${from}/${to}?amount-${amount}`, "", "GET");
            return response["data"];
        }
        catch (error) {
            throw new Error(`An error occured: ${error}`);
        }
    }
    async fetchCoins() {
        try {
            const response = await this.makeRequest(`/api/coins`, "", "GET");
            return response;
        }
        catch (error) {
            throw new Error(`An error occured: ${error}`);
        }
    }
    async fetchCurrencies() {
        throw new Error("Method not implemented.");
    }
}
exports.Gateway = Gateway;
// const config : GatewayConfig = {
//     apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NGM5MWYxYy05YWU5LTQ1YWEtOTgyNS1jMTY4MDBmNzg4MWYiLCJpYXQiOjE3NDIzMTQxMjR9.I8T0blEl3DX6GqSpsR4rOCVpdxLgILA20yOtP9dSPvs",
//     timeout: 10000
// }
// const gw = new Gateway(config);
// gw.fetchRates({ from: "ngn", to: "usd", amount: 50000 }).then((rates)=>{
//     const options: InitializeTransaction = {
//         amount: 50000,
//         currency: "ngn",
//         chain: "solana",
//         coin: "usd",
//         customer: {
//             email: "ayomikunakintade@gmail.com"
//         },
//         rates: rates["data"] as Rates,
//     }
//     gw.initializeTransaction(options).then((details)=>{
//         console.log(details);
//     });
// })
__exportStar(require("./interfaces/blueprint"), exports);
__exportStar(require("./interfaces/gateway"), exports);
//# sourceMappingURL=index.js.map