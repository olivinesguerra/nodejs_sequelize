import type { Context, Service, ServiceSchema, ServiceSettingSchema } from "moleculer";

import { EnergiService, TransactionService }  from "../module/services";
import { success, error } from "../module/util/response";
import {
    GetTxtInfoParams,
    GetListBlockParams,
    BlockSettings,
    BlockThis
 } from "../module/util/typings";

const BlockService: ServiceSchema<BlockSettings> = {
    name: "block",

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
    actions: {
        block: {
            rest: {
                method: "GET",
                path: "/",
            },
            params: {
                start_item_count: { type: "number", positive: true, integer: true, optional: true }
            },
            async handler(this: BlockThis, ctx: Context<GetListBlockParams>): Promise<any> {
                try { 
                    const data = await EnergiService.getBlocks(ctx);
                    return success("success", data, 200);
                } catch(err) {
                    return error("Error", { message: err?.message}, 4000);
                }
            },
        },


        stats: {
            rest: {
                method: "GET",
                path: "/stats",
            },
            async handler(this: BlockThis/*, ctx: Context<ActionHelloParams>*/): Promise<any> {
                try { 
                    const data = await TransactionService.getSum();
                    return success("success", data, 200);
                } catch(err) {
                    return error("Error", { message: err?.message}, 4000);
                }
            },
        },

        tx: {
            rest: {
                method: "GET",
                path: "/tx",
            },
            async handler(this: BlockThis, ctx: Context<GetListBlockParams>): Promise<any> {
                try { 
                    const data = await TransactionService.getTransactions(ctx);
                    return success("success", data, 200);
                } catch(err) {
                    return error("Error", { message: err?.message}, 4000);
                }
            },
        },

        txById: {
            rest: {
                method: "GET",
                path: "/tx/:txHash",
            },
            async handler(this: BlockThis, ctx: Context<any>): Promise<any> {
                try { 
                    const data = await EnergiService.getTxInfo(ctx.params?.params?.txHash);
                    return success("success", data, 200);
                } catch(err) {
                    return error("Error", { message: err?.message}, 4000);
                }
            },
        },
    },

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
    created() {},

    /**
     * Service started lifecycle event handler
     */
    async started() {},

    /**
     * Service stopped lifecycle event handler
     */
    async stopped() {},
};

export default BlockService;
