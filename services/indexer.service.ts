import type { Context, Service, ServiceSchema, ServiceSettingSchema } from "moleculer";
import cron from "node-cron";

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
    created() {
       
    },

    /**
     * Service started lifecycle event handler
     */
    async started() {
        cron.schedule('* * * * *', () => {
            console.log('running a task every minute');
        });
    },

    /**
     * Service stopped lifecycle event handler
     */
    async stopped() {},
};

export default IndexerService;
