import { GatewayConfig } from "./interfaces/blueprint";
import { GatewayTransaction, GenerateAddress, InitializeTransaction, RequestType } from "./interfaces/gateway";
declare abstract class GatewayBP {
    private readonly apiKey;
    private readonly timeout;
    private readonly baseurl;
    constructor({ apiKey, timeout }: GatewayConfig);
    abstract generateAddress(options: GenerateAddress): Promise<GatewayTransaction>;
    abstract initializeTransaction(options: InitializeTransaction): Promise<Map<string, any>>;
    abstract fetchRates({ from, to, amount }: {
        from: string;
        to: string;
        amount: number;
    }): Promise<Map<string, any>>;
    abstract fetchCoins(): Promise<void>;
    abstract fetchCurrencies(): Promise<void>;
    protected makeRequest(endpoint: string, data: any, requestType: RequestType): Promise<any>;
}
export { GatewayBP };
