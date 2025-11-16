import { GatewayCustomer } from "./customers/customers";
import { GatewayConfig } from "./interfaces/blueprint";
import { GenerateAddress, InitializeTransaction, Rates, RequestType } from "./interfaces/gateway";
import { GatewayRefund } from "./refunds/refunds";
import { GatewayTransaction } from "./transactions/transactions";


class Gateway {
    private readonly apiKey: string;
    private readonly timeout: number;
    private readonly baseurl: string;
    
    public readonly Transaction: GatewayTransaction;
    public readonly Customer: GatewayCustomer;
    public readonly Refund: GatewayRefund;

    constructor({apiKey, timeout = 5000} : GatewayConfig) {
        if (!apiKey || typeof apiKey !== 'string') {
            throw new Error('API key must be a non-empty string');
        }
        this.apiKey = apiKey;
        this.timeout = timeout;
        this.baseurl = "http://localhost:3000";

        this.Transaction = new GatewayTransaction(this);
    } 


    async makeRequest(endpoint: string, data: any, requestType: RequestType): Promise<any> {
        const requestOptions = {
            method: requestType,
            headers: {
                'Authorization': `x-api-key ${this.apiKey}`,
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


export { Gateway };