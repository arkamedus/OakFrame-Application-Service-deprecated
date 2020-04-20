import { MiddlewareInterface } from "../../interface/Middleware";
import { ApplicationServer } from "../ApplicationServer";
export declare class URLEncoded implements MiddlewareInterface {
    setup(app: ApplicationServer): void;
}
