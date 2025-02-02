import type { Context, Service, ServiceSchema, ServiceSettingSchema } from "moleculer";
import { EnergiService }  from "../module/services";
import { success, error } from "../module/util/response";

export interface ActionHelloParams {
    name: string;
}

export interface GetTxtInfoParams {
    txHash: string;
}

interface BlockSettings extends ServiceSettingSchema {
    defaultName: string;
}

interface BlockMethods {
    uppercase(str: string): string;
}

interface BlockLocalVars {
    myVar: string;
}

type BlockThis = Service<BlockSettings> & BlockMethods & BlockLocalVars;

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
            handler(this: BlockThis/* , ctx: Context */): string {
                return `Hello ${this.settings.defaultName}`;
            },
        },

        blockBy100: {
            rest: {
                method: "GET",
                path: "/:id",
            },
            handler(this: BlockThis/* , ctx: Context */): string {
                return `Hello ${this.settings.defaultName}`;
            },
        },


        stats: {
            rest: {
                method: "GET",
                path: "/stats",
            },
            handler(this: BlockThis, ctx: Context<ActionHelloParams>): string {
                return `Welcome, ${ctx.params.name}`;
            },
        },

        tx: {
            rest: {
                method: "GET",
                path: "/tx",
            },
            handler(this: BlockThis, ctx: Context<ActionHelloParams>): string {
                return `Welcome, ${ctx.params.name}`;
            },
        },

        txById: {
            rest: {
                method: "GET",
                path: "/tx/:txHash",
            },
            async handler(this: BlockThis, ctx: Context<GetTxtInfoParams>): Promise<any> {
                try { 
                    const data = await EnergiService.getTxInfo(ctx.params.txHash);
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
            handler(this: BlockThis, ctx: Context<ActionHelloParams>): string {
                return `Welcome, ${ctx.params.name}`;
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
