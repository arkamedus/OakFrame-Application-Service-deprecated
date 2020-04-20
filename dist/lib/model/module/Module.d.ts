import { ApplicationRouter } from "../ApplicationRouter";
import { ApplicationServer } from "../ApplicationServer";
import { Route } from "../Route";
export declare class Module {
    /** Fast interface to determine if module has been initialized **/
    private _initialized;
    init: () => any;
    update: () => any;
    focus: () => any;
    defocus: () => any;
    render: () => any;
    isInitialized(): boolean;
    use: (route: Route, app?: ApplicationServer | ApplicationRouter) => any;
}
