import {expect} from 'chai';
import {Searcher, SearchResult} from "./Searcher";

describe('Searcher', () => {

    let searcher = new Searcher();

    it('should be created', () => {

        expect(searcher).not.equal(undefined);
        expect(searcher.items.length).equal(0);
        expect(searcher.search("hello").length).equal(0);

    });

    it('return some value', () => {

        searcher.addResult(new SearchResult("Hello World","This is a test search result",["CaT","dog","meow"],function(){return "result!";}));
        expect(searcher.search("hello").length).equal(1);
        expect(searcher.search("hello")[0].title).equal("Hello World");
        expect(searcher.search("hello")[0].tags[0]).equal("cat");

    });

    it('return some value from tags', () => {

        expect(searcher.search("cAt").length).equal(1);
        expect(searcher.search("cAt")[0].title).equal("Hello World");
        expect(searcher.search("cAt")[0].tags[0]).equal("cat");

    });

});