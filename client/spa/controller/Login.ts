import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import {AccountHandler} from "../../../lib/model/AccountHandler";
import LogInView from '../view/LogIn.html';
import {Header} from "../view/Header";
import {generateStateTemplate} from "../app";

export class LogIn extends Module {

    use(){
        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new Header()).apply(generateStateTemplate()) +
                (new StringTemplate(LogInView)).apply(generateStateTemplate());
            resolve();
        });
    }

}