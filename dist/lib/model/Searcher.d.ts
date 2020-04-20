export declare class Searcher {
    items: Array<SearchResult>;
    addResult(result: SearchResult): void;
    search(search: string): any[];
}
export declare class SearchResult {
    title: string;
    desc: string;
    tags: Array<string>;
    fn: any;
    constructor(title: any, desc: any, tags: any, fn: any);
}
