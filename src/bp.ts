import { GatewayConfig } from "./interfaces/blueprint";
import { GatewayTransaction, GenerateAddress, InitializeTransaction, Rates, RequestType } from "./interfaces/gateway";


abstract class GatewayBP {
    private readonly apiKey: string;
    private readonly timeout: number;
    private readonly baseurl: string;
    constructor({apiKey, timeout = 5000} : GatewayConfig) {
        if (!apiKey || typeof apiKey !== 'string') {
            throw new Error('API key must be a non-empty string');
        }
        this.apiKey = apiKey;
        this.timeout = timeout;
        this.baseurl = "http://localhost:3000"
    }

    abstract generateAddress(options: GenerateAddress) : Promise<GatewayTransaction>;

    abstract initializeTransaction(options: InitializeTransaction) : Promise<Map<string, any>>;

    abstract fetchRates({from, to, amount}: {from: string, to: string, amount: number}): Promise<Map<string, any>>;

    abstract fetchCoins(): Promise<void>;

    abstract fetchCurrencies(): Promise<void>;

    protected async makeRequest(endpoint: string, data: any, requestType: RequestType): Promise<any> {
        const requestOptions = {
            method: requestType,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            signal: AbortSignal.timeout(this.timeout),
        }
        if(requestType === "POST") {
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



// use public api key


class GatewayError extends Error {
    constructor(message: string, public code?: string){
        super(message);

    }
}


export { GatewayBP };