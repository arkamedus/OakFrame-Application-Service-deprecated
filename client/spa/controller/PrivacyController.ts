import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import PrivacyView from '../view/Privacy.html';
import HeaderView from "../view/Header.html";
import {generateStateTemplate} from "../app";
import {ApplicationRouter} from "../../../lib/model/ApplicationRouter";

export class PrivacyController extends Module {

    use = (app?:ApplicationRouter) => {
        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(HeaderView)).apply(generateStateTemplate()) +
                (new StringTemplate(PrivacyView)).apply(generateStateTemplate());
            resolve();
        });

    };

}