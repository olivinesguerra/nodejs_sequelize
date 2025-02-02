import axios from "axios";

export const getTxInfo = async (txHash: string) => {
    return await axios.get(`https://explorer.energi.network/api?module=transaction&action=gettxinfo&txhash=${txHash}`);
};