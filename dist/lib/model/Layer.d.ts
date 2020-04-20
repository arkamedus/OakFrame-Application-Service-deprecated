import { LayerInterface } from "../interface/LayerInterface";
export declare class Layer implements LayerInterface {
    route: string;
    fn: any;
    constructor(route: any, fn: any);
}
