import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import {AccountHandler} from "../../../lib/model/AccountHandler";
import ContactView from '../view/Contact.html';
import HeaderView from "../view/Header.html";
import {app, generateStateTemplate, search_handler} from "../app";
import {ApplicationRouter} from "../../../lib/model/ApplicationRouter";
import {SearchResult} from "../../../lib/model/Searcher";

export class ContactController extends Module {

    constructor() {
        super();
        search_handler.addResult(new SearchResult("Contact", "Contact OakFrame with comments, questions, or concerns",
            ['contact','help','submit'], function () {
            app.goToPage(`//${window.location.hostname}:8080/contact`);
        }));
    }

    use = (app?: ApplicationRouter) => {
        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(HeaderView)).apply(generateStateTemplate()) +
                (new StringTemplate(ContactView)).apply(generateStateTemplate());
            resolve();
        });
    };

}