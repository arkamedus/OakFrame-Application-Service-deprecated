import {Core} from "../model/Core";

export interface MiddlewareInterface {
    setup(app:Core);
}