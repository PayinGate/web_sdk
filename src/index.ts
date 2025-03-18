import { GatewayBP } from "./bp";
import { GatewayConfig } from "./interfaces/blueprint";
import { GatewayTransaction, GenerateAddress, InitializeTransaction, Rates } from "./interfaces/gateway";

class Gateway extends GatewayBP {
    constructor(config: GatewayConfig){
        super(config);
    }
    async generateAddress(options: GenerateAddress): Promise<Map<string, unknown>> {
        try {
        const data = {
            transaction_id: options.id, 
            reference: options.reference, 
            chain: options.chain, 
            coin: options.coin,
            rates: options.rates
        }

        const response = await this.makeRequest("/api/p/transaction/generate-address", data, "POST");            
        const transactionDetails = response["data"];
        

        return transactionDetails;

        }
        catch (error) {
            throw new Error(`Error occured: ${error}`)
        }

    }
    async initializeTransaction(options: InitializeTransaction): Promise<Map<string, any>> {
        try {
            const { amount } = options;
            if(amount <= 0) {
                throw new Error('Amount must be greater than zero');
            }

            const data = {
                amount: options.amount,
                currency: options.currency,
                customer: options.customer,
                metadata: options.metadata,
                callbackUrl: options.callbackUrl,
                description: options.description
            }

            const response = await this.makeRequest("/api/p/transaction/create", data, "POST");            
            const transaction = response["data"];

            const transactionDetails = await this.generateAddress({...transaction, ...options});
            return transactionDetails;
        }
        catch (error) {
            throw new Error(`An error occured: ${error}`);
        }

    }
    async fetchRates({from, to, amount}: {from: string, to: string, amount?: number}): Promise<Map<string, any>> {
        try {
            const response = await this.makeRequest(`/api/rate/${from}/${to}?amount-${amount}`, "", "GET");
            return response;
        }
        catch (error) {
            throw new Error(`An error occured: ${error}`);
        }
    }
    async fetchCoins(): Promise<void> {
        try {
            const response = await this.makeRequest(`/api/coins`, "", "GET");
            return response;
        }
        catch (error) {
            throw new Error(`An error occured: ${error}`);
        }
    }
    async fetchCurrencies(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}


const config : GatewayConfig = {
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NGM5MWYxYy05YWU5LTQ1YWEtOTgyNS1jMTY4MDBmNzg4MWYiLCJpYXQiOjE3NDIzMTQxMjR9.I8T0blEl3DX6GqSpsR4rOCVpdxLgILA20yOtP9dSPvs",
    timeout: 10000
}
const gw = new Gateway(config);
gw.fetchRates({ from: "ngn", to: "usd", amount: 50000 }).then((rates)=>{
    const options: InitializeTransaction = {
        amount: 50000,
        currency: "ngn",
        chain: "solana",
        coin: "usd",
        customer: {
            email: "ayomikunakintade@gmail.com"
        },
        rates: rates["data"] as Rates,
    }
    gw.initializeTransaction(options).then((details)=>{
        console.log(details);
    });
})