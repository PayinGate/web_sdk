import { GatewayCustomer } from "./customers/customers";
import { GatewayConfig } from "./interfaces/blueprint";
import { RequestType } from "./interfaces/gateway";
import { GatewayRefund } from "./refunds/refunds";
import { GatewayTransaction } from "./transactions/transactions";
export declare const BASE_URL = "https://gateway-riuk.onrender.com";
declare class Gateway {
    private readonly apiKey;
    private readonly timeout;
    private readonly baseurl;
    readonly Transaction: GatewayTransaction;
    readonly Customer: GatewayCustomer;
    readonly Refund: GatewayRefund;
    constructor({ apiKey, timeout }: GatewayConfig);
    makeRequest(endpoint: string, data: any, requestType: RequestType): Promise<any>;
}
export { Gateway };
