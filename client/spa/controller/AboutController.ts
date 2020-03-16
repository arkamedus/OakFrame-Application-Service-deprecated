import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import {generateStateTemplate} from "../app";
import HeaderView from "../view/Header.html";
import AboutView from "../view/About.html";
import {ApplicationRouter} from "../../../lib/model/ApplicationRouter";

export class AboutController extends Module {

    use = (app?: ApplicationRouter) => {
        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(HeaderView)).apply(generateStateTemplate())
                + (new StringTemplate(AboutView)).apply(generateStateTemplate());
            resolve();
        });
    };

}