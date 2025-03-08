import { GatewayBPConfig } from "./interfaces/blueprint";
import { GatewayTransaction } from "./interfaces/gateway";


abstract class GatewayBP {
    readonly apiKey: string;
    readonly timeout: number;
    readonly baseurl: string;
    constructor({apiKey, timeout = 5000} : GatewayBPConfig) {
        if (!apiKey || typeof apiKey !== 'string') {
            throw new Error('API key must be a non-empty string');
        }
        this.apiKey = apiKey;
        this.timeout = timeout;
    }

    abstract generateAddress({}) : Promise<GatewayTransaction>;

    abstract initializeTransaction() : Promise<void>;

    abstract fetchRates(): Promise<void>;

    abstract fetchCoins(): Promise<void>;

    abstract fetchCurrencies(): Promise<void>;
    

    

    abstract 



}



class GatewayError extends Error {
    constructor(message: string, public code?: string){
        super(message);

    }
}