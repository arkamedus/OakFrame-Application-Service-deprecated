import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import PrivacyView from '../view/Privacy.html';
import HeaderView from "../view/Header.html";
import {generateStateTemplate} from "../app";

export class PrivacyController extends Module {

    use(){
        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(HeaderView)).apply(generateStateTemplate()) +
                (new StringTemplate(PrivacyView)).apply(generateStateTemplate());
            resolve();
        });
    }

}