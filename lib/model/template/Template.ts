//** @class Template is like an HTML container
import {replaceAll} from "../Utils";

export class Template {
    private contents: string;
    constructor(input: string) {
        this.contents = input;
    }
    getContents():string{
        return this.contents;
    }
    apply(template_key_value:any) {
        let s = ''.concat(this.getContents());
        for (let data in template_key_value) {
            console.log(`REPLACING ${data} with ${template_key_value[data]}`);
            s = replaceAll(s, '{' + (data) + '}', template_key_value[data]);
        }
        return s;
    }
}