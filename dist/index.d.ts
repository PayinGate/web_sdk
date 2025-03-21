import { GatewayBP } from "./bp";
import { GatewayConfig } from "./interfaces/blueprint";
import { GenerateAddress, InitializeTransaction } from "./interfaces/gateway";
export declare class Gateway extends GatewayBP {
    constructor(config: GatewayConfig);
    generateAddress(options: GenerateAddress): Promise<Map<string, unknown>>;
    initializeTransaction(options: InitializeTransaction): Promise<Map<string, any>>;
    fetchRates({ from, to, amount }: {
        from: string;
        to: string;
        amount?: number;
    }): Promise<Map<string, any>>;
    fetchCoins(): Promise<void>;
    fetchCurrencies(): Promise<void>;
}
export * from './interfaces/blueprint';
export * from './interfaces/gateway';
