export interface TemplateInterface {
    getContents():string;
    apply(template_key_value:any):string;
}