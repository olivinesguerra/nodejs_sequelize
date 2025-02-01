import type { Context, Service, ServiceSchema, ServiceSettingSchema } from "moleculer";

export interface ActionHelloParams {
    name: string;
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
                path: "/block",
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
