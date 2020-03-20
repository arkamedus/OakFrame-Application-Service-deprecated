import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import PrivacyView from '../view/Privacy.html';
import HeaderView from "../view/Header.html";
import {app, generateStateTemplate, search_handler} from "../app";
import {ApplicationRouter} from "../../../lib/model/ApplicationRouter";
import {SearchResult} from "../../../lib/model/Searcher";

export class PrivacyController extends Module {

    constructor() {
        super();
        search_handler.addResult(new SearchResult("Privacy Policy", "OakFrame and associated properties Privacy Policy",
            ['terms', 'terms of service', 'tos', 'privacy', 'policy'], function () {
                app.goToPage(`//${window.location.hostname}:8080/privacy`);
            }));
    }

    use = (app?: ApplicationRouter) => {
        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(HeaderView)).apply(generateStateTemplate()) +
                (new StringTemplate(PrivacyView)).apply(generateStateTemplate());
            resolve();
        });

    };

}