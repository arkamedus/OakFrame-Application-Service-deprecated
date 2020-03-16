import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import {AccountHandler} from "../../../lib/model/AccountHandler";
import LogInView from '../view/LogIn.html';
import HeaderView from "../view/Header.html";
import {generateStateTemplate} from "../app";
import {ApplicationRouter} from "../../../lib/model/ApplicationRouter";

export class LogInController extends Module {

    use = (app?:ApplicationRouter) => {

        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(HeaderView)).apply(generateStateTemplate()) +
                (new StringTemplate(LogInView)).apply(generateStateTemplate());
            resolve();
        });

    };

}