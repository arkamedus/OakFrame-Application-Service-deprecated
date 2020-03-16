import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import LandingView from '../view/Landing.html';
import {generateStateTemplate} from "../app";
import {ApplicationRouter} from "../../../lib/model/ApplicationRouter";

export class LandingController extends Module {

    use = (app?:ApplicationRouter) => {

        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(LandingView)).apply(generateStateTemplate());
            resolve();
        });

    };

}