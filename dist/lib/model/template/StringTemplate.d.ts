import { TemplateInterface } from "../../interface/TemplateInterface";
export declare class StringTemplate implements TemplateInterface {
    private contents;
    constructor(input: string);
    getContents(): string;
    apply(template_key_value: any): string;
}
