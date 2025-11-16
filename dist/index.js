"use strict";
// import { GatewayBP } from "./bp";
// import { GatewayConfig } from "./interfaces/blueprint";
// import { GatewayError, GatewayTransaction, GenerateAddress, InitializeTransaction, Rates, Transaction, TransactionWatcher } from "./interfaces/gateway";
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
// export interface ITransaction {
//     generateAddress(options: GenerateAddress): Promise<GatewayTransaction>;
//     initializeTransaction(options: InitializeTransaction): Promise<Map<string, any>>;
//     fetchRates(opts: {from: string, to: string, amount: number}): Promise<Map<string, any>>;
//     fetchCoins(): Promise<void>;
//     fetchCurrencies(): Promise<void>;
// }
// export class TransactionImpl implements ITransaction {
//     _gateway: GatewayBP;
//     constructor(private gateway: GatewayBP) {
//         this.gateway = gateway;
//     }
//     initializeTransaction(options: InitializeTransaction): Promise<Map<string, any>> {
//         throw new Error("Method not implemented.");
//     }
//     fetchRates(opts: { from: string; to: string; amount: number; }): Promise<Map<string, any>> {
//         throw new Error("Method not implemented.");
//     }
//     fetchCoins(): Promise<void> {
//         throw new Error("Method not implemented.");
//     }
//     fetchCurrencies(): Promise<void> {
//         throw new Error("Method not implemented.");
//     }
//     async generateAddress(options: GenerateAddress) {
//         return this.gateway.makeRequest("/transaction", options, "POST");
//     }
//     /* implement other methods similarly */
// }
// export class Gateway extends GatewayBP {
//     constructor(config: GatewayConfig){
//         super(config);
//     }
//     async generateAddress(options: GenerateAddress): Promise<Map<string, unknown>> {
//         try {
//             console.log(options);
//         const data = {
//             transaction_id: options.id, 
//             reference: options.reference, 
//             chain: options.chain, 
//             coin: options.coin,
//             rates: options.rates
//         }
//         const response = await this.makeRequest("/api/p/transaction/generate-address", data, "POST");            
//         const transactionDetails = response["data"];
//         return transactionDetails;
//         }
//         catch (error) {
//             throw new Error(`Error occured: ${error}`)
//         }
//     }
//     async initializeTransaction(options: InitializeTransaction): Promise<Map<string, any>> {
//         try {
//             const { amount } = options;
//             if(amount <= 0) {
//                 throw new Error('Amount must be greater than zero');
//             }
//             const data = {
//                 amount: options.amount,
//                 currency: options.currency,
//                 customer: options.customer,
//                 metadata: options.metadata,
//                 callbackUrl: options.callbackUrl,
//                 description: options.description
//             }
//             const response = await this.makeRequest("/api/p/transaction/create", data, "POST");            
//             const transaction = response["data"];
//             const transactionDetails = await this.generateAddress({...transaction, ...options});
//             return transactionDetails;
//         }
//         catch (error) {
//             throw new Error(`An error occured: ${error}`);
//         }
//     }
//     async fetchTransaction(reference: string): Promise<Transaction> {
//         try {
//             const response = await this.makeRequest(`/api/p/transaction/fetch?reference=${reference}`, null, "GET");
//             return response["data"];
//         }
//         catch(error){
//             throw new Error(error);
//         }
//     }
//     watchTransaction(reference: string) : TransactionWatcher {
//         let pollingNumber = 1;
//         const handlers = {
//             onComplete: null as ((transaction: Transaction) => void) | null,
//             onError: null as ((error: Error) => void) | null,
//             onCancelled: null as ((transaction: Transaction) => void) | null
//         };
//         const interval = setInterval(()=>{
//             console.log(`Polling #${pollingNumber}`);
//             pollingNumber++;
//             this.fetchTransaction(reference)
//                 .then((transaction)=>{
//                     if(transaction["status"] === "completed") {
//                         clearInterval(interval);
//                         if (handlers.onComplete) handlers.onComplete(transaction);
//                     }
//                     else if (transaction["status"] === "cancelled") {
//                         clearInterval(interval);
//                         if (handlers.onCancelled) handlers.onCancelled(transaction);
//                     }
//                 })
//                 .catch((error)=>{
//                     clearInterval(interval);
//                     if (handlers.onError) handlers.onError(error);
//                 })
//         }, 30000);
//         return {
//             onComplete(this: TransactionWatcher, callback: (transaction: Transaction) => void) {
//                 handlers.onComplete = callback;
//                 return this;
//             },
//             onError(this: TransactionWatcher, callback: (error: Error) => void) {
//                 handlers.onError = callback;
//                 return this;
//             },
//             onCancelled(this: TransactionWatcher, callback: (transaction: Transaction) => void) {
//                 handlers.onCancelled = callback;
//                 return this;
//             }
//         }
//     }
//     async fetchRates({from, to, amount = 0}: {from: string, to: string, amount?: number}): Promise<Map<string, any>> {
//         try {
//             const response = await this.makeRequest(`/api/rate/${from}/${to}?amount-${amount}`, "", "GET");
//             return response["data"];
//         }
//         catch (error) {
//             throw new Error(`An error occured: ${error}`);
//         }
//     }
//     async fetchCoins(): Promise<void> {
//         try {
//             const response = await this.makeRequest(`/api/coins`, "", "GET");
//             return response;
//         }
//         catch (error) {
//             throw new Error(`An error occured: ${error}`);
//         }
//     }
//     async fetchCurrencies(): Promise<void> {
//         throw new Error("Method not implemented.");
//     }
// }
// const config : GatewayConfig = {
//     apiKey: "sk_test_a8eb6f6cbeb539bb35ac87c27ee42418f699519b2d9cb857a46cbda9f5fd6d36",
//     timeout: 10000
// }
// const gw = new Gateway(config);
// // // gw.Transaction.fetchTransaction('gwp_MaP0DdaRLX3ZSj3sJANIY').then((transaction)=>{console.log(transaction)}).catch((error)=>{console.log(error)})
// // gw.Transaction.watchTransaction("gwp_MaP0DdaRLX3ZSj3sJANIY").onComplete(()=>{
// //     console.log("transaction complete")
// // })
// // .onCancelled(()=>{
// //     console.log("transaction cancelled");
// // })
// // .onError(()=>{
// //     console.log("error occured")
// // })
// gw.Transaction.fetchRates({ from: "ngn", to: "usdc", amount: 50000 }).then((rates)=>{
//     const options: InitializeTransaction = {
//         amount: 50000,
//         currency: "ngn",
//         chain: "solana",
//         coin: "usdc",
//         customer: {
//             email: "ayomikunakintade@gmail.com"
//         },
//         rates: rates as unknown as Rates,
//     }
//     gw.Transaction.initialize(options).then((details)=>{
//         console.log(details);
//     });
// })
// gw.Transaction.initialize({
//         amount: 50000,
//         currency: "ngn",
//         customer: {
//             email: "ayomikunakintade@gmail.com"
//         },
//         container: ".payment_container"
// }, {
//     onComplete: ()=>{}
// })
// // gw.watchTransaction("gwp_EsIlf4asBW4WRqdJ4XhK9")
// //     .onComplete((transaction)=>{
// //         console.log(transaction);
// //     })
// //     .onCancelled((transaction)=>{
// //         console.log(transaction);
// //     })
// //     .onError((error)=>{
// //         console.log(error);
// //     })
__exportStar(require("./transactions/transactions"), exports);
__exportStar(require("./interfaces/blueprint"), exports);
__exportStar(require("./bp"), exports);
//# sourceMappingURL=index.js.map