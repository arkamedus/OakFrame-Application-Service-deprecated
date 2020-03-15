import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import {AccountHandler} from "../../../lib/model/AccountHandler";
import SignUpView from '../view/SignUp.html';
import HeaderView from "../view/Header.html";
import {generateStateTemplate} from "../app";

export class SignUpController extends Module {

    use(){
        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(HeaderView)).apply(generateStateTemplate()) +
                (new StringTemplate(SignUpView)).apply(generateStateTemplate());
            resolve();
        });
    }

}