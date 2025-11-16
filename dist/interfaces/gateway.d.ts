interface GatewayTransaction {
}
type RequestType = "POST" | "GET";
interface GenerateAddress extends InitializeTransaction {
    id: string;
    reference: string;
}
interface Rates {
    rate: number;
    convert_from: string;
    convert_to: string;
    previous_amount: number;
    new_amount: number;
    str?: string;
    rate_from_id: string;
    rate_to_id: string;
}
type DotOrHash = `${'.' | '#'}${string}`;
type InitTransaction = InitWithElement | InitializeTransaction;
declare function isInitWithElement(x: any): x is InitWithElement;
interface InitializeTransaction {
    amount: number;
    currency: string;
    chain: string;
    coin: string;
    customer: Customer;
    rates: Rates;
    metadata?: Map<string, any>;
    callbackUrl?: string;
    description?: string;
}
interface InitWithElement {
    amount: number;
    currency: string;
    customer: Customer;
    metadata?: Map<string, any>;
    callbackUrl?: string;
    description?: string;
    container: DotOrHash;
}
interface Customer {
    email: string;
    id?: string;
}
interface Transaction {
    [key: string]: any;
}
interface GatewayError {
    message: string;
    code?: string;
}
interface TransactionWatcher {
    onComplete(callback: (transaction: Transaction) => void): this;
    onError(callback: (error: Error) => void): this;
    onCancelled(callback: (transaction: Transaction) => void): this;
}
interface InitTransactionWatcher {
    onComplete?: (transaction: Transaction) => void;
    onError?: (error: Error) => void;
    onCancelled?: (transaction: Transaction) => void;
}
export { GatewayTransaction, RequestType, GenerateAddress, InitializeTransaction, Rates, Transaction, GatewayError, TransactionWatcher, InitTransaction, isInitWithElement, InitTransactionWatcher };
