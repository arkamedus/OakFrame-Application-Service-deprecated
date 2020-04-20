import { MiddlewareInterface } from "../../interface/Middleware";
import { ApplicationServer } from "../ApplicationServer";
export declare class CookieSession implements MiddlewareInterface {
    setup(app: ApplicationServer): void;
    parseCookies(input: any): {};
}
