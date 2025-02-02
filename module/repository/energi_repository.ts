import axios from "axios";

export const getTxInfo = async (txHash: string) => {
    console.log(`http://explorer.energi.network/api?module=transaction&action=gettxinfo&txhash=${txHash}`);
    return await axios.get(`http://explorer.energi.network/api?module=transaction&action=gettxinfo&txhash=${txHash}`);
};

export const getBlocks = async (params: { block_number?: string | undefined, type?: string, block_type?: string | undefined, items_count?: string | number | undefined }) => {
    console.log(params);
    let tempFilter: any = {...params};
        
    for (var propName in tempFilter) {
        console.log(propName);
        if (tempFilter[propName] === null || tempFilter[propName] === undefined) {
            delete tempFilter[propName];
        } else {
            tempFilter[propName] = tempFilter[propName];
        }
    }
    console.log(`https://explorer.energi.network/block?${new URLSearchParams(tempFilter).toString()}`);

    return await axios.get(`https://explorer.energi.network/blocks?${new URLSearchParams(tempFilter).toString()}`);
}

export const getAllTransactionFromBlock = async(block: string) => {
    return await axios.get(`https://explorer.energi.network/block/${block}/transactions?type=JSON`);
}