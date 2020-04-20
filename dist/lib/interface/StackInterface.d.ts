import { Layer } from "../model/Layer";
export interface StackInterface {
    stack: Array<Layer>;
    use(route: any, fn?: any): void;
}
