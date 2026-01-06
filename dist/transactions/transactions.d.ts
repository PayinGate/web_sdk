import { Gateway } from "../bp";
import { GenerateAddress, InitTransaction, InitTransactionWatcher, Transaction, TransactionWatcher } from "../interfaces/gateway";
/**
 * Functions:
 * - {@link generateAddress}
 * - {@link initialize}
 * - {@link fetchTransaction}
 * - {@link watchTransaction}
 * - {@link fetchRates}
 * - {@link fetchCoins}
 */
export declare class GatewayTransaction {
    private gateway;
    constructor(gateway: Gateway);
    generateAddress(options: GenerateAddress): Promise<Map<string, unknown>>;
    initialize(options: InitTransaction, callbacks?: InitTransactionWatcher): Promise<Map<string, any>>;
    fetchTransaction(reference: string): Promise<Transaction>;
    watchTransaction(reference: string): TransactionWatcher;
    fetchRates({ from, to, amount }: {
        from: string;
        to: string;
        amount?: number;
    }): Promise<Map<string, any>>;
    fetchCoins(gateway: Gateway): Promise<void>;
    fetchCurrencies(): Promise<void>;
}
