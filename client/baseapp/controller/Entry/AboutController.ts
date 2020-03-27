import {Module} from "../../../../lib/model/module/Module";
import {ApplicationRouter} from "../../../../lib/model/ApplicationRouter";
import {StringTemplate} from "../../../../lib/model/template/StringTemplate";
import AboutView from "../../view/AboutView.html";

export class AboutController extends Module {
    use = (app?: ApplicationRouter) => {

        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(AboutView)).getContents();
            resolve();
        });

    };
}