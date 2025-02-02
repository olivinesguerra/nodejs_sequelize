import type { Context } from "moleculer";
import * as htmlparser2 from "htmlparser2";


import { EnergiRepository } from "../repository";
import {
    GetListBlockParams,
 } from "../../module/util/typings";

export const getTxInfo = async (txHash: string) => {
    const res = await EnergiRepository.getTxInfo(txHash);
    return res?.data?.result;
};

export const getBlocks = async(ctx: Context<GetListBlockParams>) => {
    const res = await EnergiRepository.getBlocks({ 
        type: "JSON",
        block_type: "Block"
    });

    const { data } = res;
    const mappedData = [];

    const stringifyCircularJSON = (obj: any) => {
        const seen = new WeakSet();
        return JSON.stringify(obj, (key, value) => {
          if (value !== null && typeof value === "object") {
            if (seen.has(value)) return;
            seen.add(value);
          }
          return value;
        });
    };

    for (const index in data?.items) {
        const dom: any = await htmlparser2.parseDocument(data?.items[index]?.replace("\n","")?.replace(" ",""));
        console.log("***** START *****");
        const domJson: any = JSON.parse(stringifyCircularJSON(dom));
        console.log("domJson?.children", domJson?.children);

        for (const subIndex in domJson?.children) {
            const item = domJson?.children[subIndex];
            console.log("item", item?.next?.attribs);
            // const res = await EnergiRepository.getTxInfo(item?.next?.attribs["data-block-hash"]);
            // console.log(    res?.data?.result);
            mappedData.push({ block_number: item?.next?.attribs["data-block-number"], data_block_hash: item?.next?.attribs["data-block-hash"] });
            break; 
        }
        
        console.log("***** END *****");
    }
    
    return mappedData;
};