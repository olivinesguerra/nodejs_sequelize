import type { Service, ServiceSettingSchema } from "moleculer";

export interface GetTxtInfoParams {
    params: {
        txHash: string;
    }
};

export interface GetListBlockParams {
   query: {
        start_item_count: string,
   }
}

export interface BlockSettings extends ServiceSettingSchema {
    defaultName: string;
}

export interface BlockMethods {
    uppercase(str: string): string;
}

export interface BlockLocalVars {
    myVar: string;
    isRunning: boolean;
}

export type BlockThis = Service<BlockSettings> & BlockMethods & BlockLocalVars;