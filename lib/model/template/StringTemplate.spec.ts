import {expect} from 'chai';
import {StringTemplate} from "./StringTemplate";

describe('StringTemplate', () => {

    let string_template = new StringTemplate(`hello {name}!`);

    it('should be created', () => {
        expect(string_template).not.equal(undefined);
    });

    it('return some value', () => {
        expect(string_template.apply({name: "amile"})).equal('hello amile!');
    });

});