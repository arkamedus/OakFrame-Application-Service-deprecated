import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";

export class Entry extends Module {
    render (){
        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(``)).apply({hostname:window.location.href});
            resolve();
        });
    }
}