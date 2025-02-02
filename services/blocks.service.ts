import type { Context, Service, ServiceSchema, ServiceSettingSchema } from "moleculer";

import { EnergiService }  from "../module/services";
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
            handler(this: BlockThis/*, ctx: Context<ActionHelloParams>*/): string {
                return `Welcome`;
            },
        },

        tx: {
            rest: {
                method: "GET",
                path: "/tx",
            },
            handler(this: BlockThis/*, ctx: Context<ActionHelloParams>*/): string {
                return `Welcome`;
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

        index : {
            rest: {
                method: "POST",
                path: "/index ",
            },
            async handler(this: BlockThis, ctx: Context<GetListBlockParams>): Promise<any> {
                try { 
                    const data = await EnergiService.createIndex(ctx);
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
