"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayTransaction = void 0;
const gateway_1 = require("../interfaces/gateway");
const PAY_URL = "https://gw-web.ayomikunakintade.workers.dev/";
/**
 * Functions:
 * - {@link generateAddress}
 * - {@link initialize}
 * - {@link fetchTransaction}
 * - {@link watchTransaction}
 * - {@link fetchRates}
 * - {@link fetchCoins}
 */
class GatewayTransaction {
    constructor(gateway) {
        this.gateway = gateway;
    }
    async generateAddress(options) {
        try {
            // console.log(options);
            const data = {
                transaction_id: options.id,
                reference: options.reference,
                chain: options.chain,
                coin: options.coin,
                rates: options.rates
            };
            const response = await this.gateway.makeRequest("/api/p/transaction/generate-address", data, "POST");
            const transactionDetails = response["data"];
            return transactionDetails;
        }
        catch (error) {
            throw new Error(`Error occured: ${error}`);
        }
    }
    async initialize(options, callbacks) {
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
            const response = await this.gateway.makeRequest("/api/p/transaction/create", data, "POST");
            const transaction = response["data"];
            if (!(0, gateway_1.isInitWithElement)(options)) {
                const transactionDetails = await this.generateAddress({ ...transaction, ...options });
                return transactionDetails;
            }
            else {
                let containerElement;
                const container = options.container;
                if (container.charAt(0) == ".") {
                    containerElement = document.getElementsByClassName(container)[0];
                }
                else {
                    containerElement = document.getElementById(container);
                }
                const iframe = document.createElement('iframe');
                iframe.src = `${PAY_URL}/pay/${transaction.reference}`;
                iframe.width = "100%";
                iframe.height = "100%";
                iframe.style.border = "none";
                iframe.style.position = "fixed";
                iframe.style.top = "0";
                iframe.style.left = "0";
                iframe.style.zIndex = "1000";
                iframe.id = "gateway_frame";
                iframe.allow = "clipboard-write";
                iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-popups");
                containerElement.appendChild(iframe);
                window.addEventListener('message', (event) => {
                    // console.log(event);
                    if (event.origin !== PAY_URL)
                        return;
                    const { type, data } = event.data;
                    if (type == "transaction.completed") {
                        callbacks.onComplete(data);
                    }
                    else if (type == "transaction.cancelled") {
                        callbacks.onCancelled(data);
                    }
                    else {
                        callbacks.onError(new Error("An error occured during payment"));
                    }
                });
                // this.watchTransaction(transaction.reference)
                //     .onComplete((tx)=>{if (callbacks.onComplete) callbacks.onComplete(tx)})
                //     .onCancelled((tx)=>{if (callbacks.onCancelled) callbacks.onCancelled(tx);})
                //     .onError((error)=>{ if (callbacks.onError) callbacks.onError(error); })
            }
        }
        catch (error) {
            if (callbacks.onError)
                callbacks.onError(new Error(`An error occured: ${error}`));
            return;
            throw new Error(`An error occured: ${error}`);
        }
    }
    async fetchTransaction(reference) {
        try {
            const response = await this.gateway.makeRequest(`/api/p/transaction/fetch?reference=${reference}`, null, "GET");
            return response["data"];
        }
        catch (error) {
            throw new Error(error);
        }
    }
    watchTransaction(reference) {
        let pollingNumber = 1;
        const handlers = {
            onComplete: null,
            onError: null,
            onCancelled: null
        };
        const interval = setInterval(() => {
            // console.log(`Polling #${pollingNumber}`);
            pollingNumber++;
            this.fetchTransaction(reference)
                .then((transaction) => {
                if (transaction["status"] === "completed") {
                    clearInterval(interval);
                    if (handlers.onComplete)
                        handlers.onComplete(transaction);
                }
                else if (transaction["status"] === "cancelled") {
                    clearInterval(interval);
                    if (handlers.onCancelled)
                        handlers.onCancelled(transaction);
                }
            })
                .catch((error) => {
                clearInterval(interval);
                if (handlers.onError)
                    handlers.onError(error);
            });
        }, 10000);
        return {
            onComplete(callback) {
                handlers.onComplete = callback;
                return this;
            },
            onError(callback) {
                handlers.onError = callback;
                return this;
            },
            onCancelled(callback) {
                handlers.onCancelled = callback;
                return this;
            }
        };
    }
    async fetchRates({ from, to, amount = 0 }) {
        try {
            const response = await this.gateway.makeRequest(`/api/rate/${from}/${to}?amount-${amount}`, "", "GET");
            return response["data"];
        }
        catch (error) {
            throw new Error(`An error occured: ${error}`);
        }
    }
    async fetchCoins(gateway) {
        try {
            const response = await gateway.makeRequest(`/api/coins`, "", "GET");
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
exports.GatewayTransaction = GatewayTransaction;
function setUserAgent(window, userAgent) {
    if (window.navigator.userAgent != userAgent) {
        var userAgentProp = {
            get: function () {
                return userAgent;
            }
        };
        try {
            Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
        }
        catch (e) {
            window.navigator = Object.create(navigator, {
                userAgent: userAgentProp
            });
        }
    }
}
//# sourceMappingURL=transactions.js.map