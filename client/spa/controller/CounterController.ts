import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import {AccountHandler} from "../../../lib/model/AccountHandler";
import CountView from '../view/Count.html';
import HeaderView from "../view/Header.html";
import {generateStateTemplate} from "../app";
import {ApplicationRouter} from "../../../lib/model/ApplicationRouter";
import {combine} from "../../../lib/model/Utils";

export class CounterController extends Module {

    private count: number = 0;
    private loop;

    use = (app: ApplicationRouter) => {
        let self = this;
        app.focusModule(this);
        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(HeaderView)).apply(generateStateTemplate()) +
                (new StringTemplate(CountView)).apply(combine([{count: self.count}, generateStateTemplate()]));
            resolve();
        });

    };

    focus = (): void => {
        let self = this;
        this.loop = window.setInterval(function () {
            self.update();
        }, (1000 / 24) | 0);
    };

    update = (): void => {
        this.count++;
        document.getElementById("count").innerText = `${this.count}`;
    };

    defocus = (): void => {
        window.clearInterval(this.loop);
    };


}