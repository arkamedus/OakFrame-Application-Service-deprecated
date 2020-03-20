import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import {app, generateStateTemplate, search_handler} from "../app";
import HeaderView from "../view/Header.html";
import AboutView from "../view/About.html";
import {ApplicationRouter} from "../../../lib/model/ApplicationRouter";
import {SearchResult} from "../../../lib/model/Searcher";

export class AboutController extends Module {

    constructor(){
        super();
        search_handler.addResult(new SearchResult("About","Read and learn more about OakFrame",['about','about us','help','info','oakframe','oak'], function(){
            console.log('ROUTING TO ABOTU',`//${window.location.hostname}:8080/about`);
            app.goToPage(`//${window.location.hostname}:8080/about`);
        }));
    }

    use = (app?: ApplicationRouter) => {
        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(HeaderView)).apply(generateStateTemplate())
                + (new StringTemplate(AboutView)).apply(generateStateTemplate());
            resolve();
        });
    };

}