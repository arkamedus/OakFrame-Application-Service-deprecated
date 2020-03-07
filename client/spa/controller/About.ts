import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";

export class About extends Module {
    render (){
        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(`<h1>About this OakFrame Web Enabled App</h1><p>Well, there's not much to it, so we hope it's still fairly intuitive!</p>`)).apply({hostname:window.location.href});
            resolve();
        });
    }

    use(){
        // TODO
    }
}