import {existsSync, readFileSync} from "fs";
import {replaceAll} from "./Utils";
import {TemplateInterface} from "../interface/TemplateInterface";

export class Template implements TemplateInterface {

    private contents: string;
    private readonly file: string;
    private file_accessed: Number;

    constructor(file: string) {
        this.file_accessed = Date.now();
        this.file = file;
        this.loadFile(file);
    }

    getContents(): string {
        return this.contents;
    }

    apply(template_key_value: any): string {
        this.loadFile(this.file);
        let s = ''.concat(this.contents);
        for (let data in template_key_value) {
            s = replaceAll(s, '{' + (data) + '}', template_key_value[data]);
        }
        return s;
    }

    loadFile(f: string) {
        if (existsSync(f)) {
            this.contents = readFileSync(f, 'binary');
        } else {
            console.error('file not loaded', f);
        }
    }
}