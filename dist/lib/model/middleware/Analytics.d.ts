import { ApplicationServer } from "../ApplicationServer";
import { MiddlewareInterface } from "../../interface/Middleware";
export declare class Analytics implements MiddlewareInterface {
    setup(app: ApplicationServer): void;
}
