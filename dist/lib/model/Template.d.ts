import { TemplateInterface } from "../interface/TemplateInterface";
export declare class Template implements TemplateInterface {
    private contents;
    private readonly file;
    private file_accessed;
    constructor(file: string);
    getContents(): string;
    apply(template_key_value: any): string;
    loadFile(f: string): void;
}
