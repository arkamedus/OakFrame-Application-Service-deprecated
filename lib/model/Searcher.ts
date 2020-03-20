export class Searcher {

    items: Array<SearchResult> = [];

    addResult(result: SearchResult) {
        this.items.push(result);
    }

    search(search: string) {
        search = search.toLowerCase();
        let results = [];
        this.items.forEach(function (item) {
            if (item.title.toLowerCase().indexOf(search) !== -1
                || item.desc.toLowerCase().indexOf(search) !== -1
                || item.tags.indexOf(search) !== -1
            ) {
                results.push(item);
            }
        });
        return results;
    }

}

export class SearchResult {

    public title: string;
    public desc: string;
    public tags: Array<string>;
    public fn: any;

    constructor(title, desc, tags, fn) {
        this.title = title;
        this.desc = desc;
        this.tags = tags;
        this.tags = tags.map(function (item) {
            return item.toLowerCase();
        });
        this.fn = fn;
    }

}