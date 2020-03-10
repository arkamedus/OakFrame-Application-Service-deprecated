import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import {AccountHandler} from "../../../lib/model/AccountHandler";
import SignUpView from '../view/SignUp.html';
import {Header} from "../view/Header";
import {generateStateTemplate} from "../app";

export class SignUp extends Module {

    use(){
        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new Header()).apply(generateStateTemplate()) +
                (new StringTemplate(SignUpView)).apply(generateStateTemplate());
            resolve();
        });
    }

}