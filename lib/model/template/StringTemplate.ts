//** @class Template is like an HTML container
import {replaceAll} from "../Utils";
import {TemplateInterface} from "../../interface/TemplateInterface";

export class StringTemplate implements TemplateInterface {
    private readonly contents: string;
    constructor(input: string) {
        this.contents = input;
    }
    getContents():string{
        return this.contents;
    }
    apply(template_key_value:any) {
        let s = ''.concat(this.getContents());
        for (let data in template_key_value) {
            s = replaceAll(s, '{' + (data) + '}', template_key_value[data]);
        }
        return s;
    }

}