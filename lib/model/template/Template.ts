//** @class Template is like an HTML container
export class Template {
    private contents: string;
    constructor(input: string) {
        this.contents = input;
    }
    getContents():string{
        return this.contents;
    }
}