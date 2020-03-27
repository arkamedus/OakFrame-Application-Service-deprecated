import {Module} from "../../../../lib/model/module/Module";
import {ApplicationRouter} from "../../../../lib/model/ApplicationRouter";
import {StringTemplate} from "../../../../lib/model/template/StringTemplate";
import EntryView from "../../view/EntryView.html";

export class EntryController extends Module {
    use = (app?: ApplicationRouter) => {

        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(EntryView)).getContents();
            resolve();
        });

    };
}