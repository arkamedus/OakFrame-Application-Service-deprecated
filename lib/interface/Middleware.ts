import {ApplicationServer} from "../model/ApplicationServer";

export interface MiddlewareInterface {
    setup(app: ApplicationServer);
}