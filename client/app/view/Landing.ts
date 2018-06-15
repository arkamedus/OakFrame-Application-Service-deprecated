import {Template} from "../../../lib/model/template/Template";

export class Landing extends Template {
    constructor() {
        super(`<h1>Waiting on response from Socket...</h1>`);
    }
}