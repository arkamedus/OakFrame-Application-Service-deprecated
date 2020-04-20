"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Searcher = /** @class */ (function () {
    function Searcher() {
        this.items = [];
    }
    Searcher.prototype.addResult = function (result) {
        this.items.push(result);
    };
    Searcher.prototype.search = function (search) {
        search = search.toLowerCase();
        var results = [];
        this.items.forEach(function (item) {
            if (item.title.toLowerCase().indexOf(search) !== -1
                || item.desc.toLowerCase().indexOf(search) !== -1
                || item.tags.indexOf(search) !== -1) {
                results.push(item);
            }
        });
        return results;
    };
    return Searcher;
}());
exports.Searcher = Searcher;
var SearchResult = /** @class */ (function () {
    function SearchResult(title, desc, tags, fn) {
        this.title = title;
        this.desc = desc;
        this.tags = tags;
        this.tags = tags.map(function (item) {
            return item.toLowerCase();
        });
        this.fn = fn;
    }
    return SearchResult;
}());
exports.SearchResult = SearchResult;
