import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import LandingView from '../view/Landing.html';
import {generateStateTemplate} from "../app";

export class LandingController extends Module {

    use(){
        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(LandingView)).apply(generateStateTemplate());
            resolve();
        });
    }

}