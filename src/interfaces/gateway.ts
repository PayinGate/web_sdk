import { GatewayBP } from "../bp";
import { GatewayConfig } from "./blueprint";

interface GatewayTransaction {

}



type RequestType = "POST" | "GET";


interface GenerateAddress extends InitializeTransaction {
    id: string,
    reference: string,
}

interface Rates {
    rate: number,
    convert_from: string,
    convert_to: string,
    previous_amount: number,
    new_amount: number,
    str?: string,
    rate_from_id: string,
    rate_to_id: string
}


interface InitializeTransaction {
    amount: number,
    currency: string,
    chain: string,
    coin: string,
    customer: Customer,
    rates: Rates,
    metadata?: Map<string, any>,
    callbackUrl?: string,
    description?: string
}


interface Customer {
    email: string,
    id?: string
}


export { GatewayTransaction, RequestType, GenerateAddress, InitializeTransaction, Rates };