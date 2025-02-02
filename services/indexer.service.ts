import type { Context, Service, ServiceSchema, ServiceSettingSchema } from "moleculer";
import cron from "node-cron";
import * as htmlparser2 from "htmlparser2";

import { EnergiRepository } from "../module/repository";
import { EnergiService }  from "../module/services";
import { success, error } from "../module/util/response";
import {
    GetTxtInfoParams,
    GetListBlockParams,
    BlockSettings,
    BlockThis
 } from "../module/util/typings";
 

const IndexerService: ServiceSchema<BlockSettings> = {
    name: "indexer",

    /**
     * Settings
     */
    settings: {
        defaultName: "Moleculer",
    },

    /**
     * Dependencies
     */
    dependencies: [],

    /**
     * Actions
     */
    actions: {},

    /**
     * Events
     */
    events: {},

    /**
     * Methods
     */
    methods: {},

    /**
     * Service created lifecycle event handler
     */
    async created() {
        await this.broker.cacher?.set("is_running", false);
    },

    /**
     * Service started lifecycle event handler
     */
    async started() {
        cron.schedule('* * * * *', async () => {
            console.log('running a task every minute');
            const isRunning: any = await this.broker.cacher?.get('is_running');
            console.log("isRunning", isRunning);
            if (isRunning === null || isRunning === false) {
                this.broker.cacher?.set("is_running", true);

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
                    // console.log(dom);
                    const domJson: any = JSON.parse(stringifyCircularJSON(dom));
                    // console.log("domJson?.children", domJson?.children);

                    for (const subIndex in domJson?.children) {
                        const item = domJson?.children[subIndex];

                        const blockRes: any = await EnergiRepository.getAllTransactionFromBlock(item?.next?.attribs["data-block-number"]);
                        const { items } = blockRes?.data;
                        
                        const transactions: any = [];

                        for (const transIndex in items) {
                            const domTransact: any = await htmlparser2.parseDocument(items?.[transIndex]?.replace("\n","")?.replace(" ",""));
                            const domJsonTransact: any = JSON.parse(stringifyCircularJSON(domTransact));
                            // console.log("items", domJsonTransact);

                            for (const subDomIndex in domJsonTransact?.children) {
                                const transItem = domJsonTransact?.children[subDomIndex];
                                console.log("data-identifier-hash", transItem?.attribs["data-identifier-hash"]);
                                const transactRes: any = await EnergiRepository.getTxInfo(transItem?.attribs["data-identifier-hash"]);
                                console.log(transactRes?.data?.result);
                            }
                        }

                        mappedData.push({ block_number: item?.next?.attribs["data-block-number"], data_block_hash: item?.next?.attribs["data-block-hash"], transactions });
                        break; 
                    }
                    
                    console.log("***** END *****");
                    await this.broker.cacher?.set("is_running", false);
                }

            }
        });
    },

    /**
     * Service stopped lifecycle event handler
     */
    async stopped() {},
};

export default IndexerService;
