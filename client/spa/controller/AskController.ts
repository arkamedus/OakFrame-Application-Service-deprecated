import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import AskView from '../view/Ask.html';
import HeaderView from "../view/Header.html";
import {generateStateTemplate} from "../app";
import {ApplicationRouter} from "../../../lib/model/ApplicationRouter";
import {combine} from "../../../lib/model/Utils";
import {Route} from "../../../lib/model/Route";
import {Listener} from "../../../lib/model/Listener";

export class AskController extends Module {

    private count: number = 0;
    private loop;
    private listener;
    public transcript=[];

    use = (app?: ApplicationRouter) => {
        let self = this;
            app.focusModule(this);
            console.log('HELLO ASK');
        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(HeaderView)).apply(generateStateTemplate()) +
                (new StringTemplate(AskView)).apply(combine([{count: self.count}, generateStateTemplate()]));
            resolve();
        });


    };

    focus = (): void => {
        let self = this;
        console.log('FOCUS ASK');
        this.listener = new Listener();
        this.listener.start(this);

        this.loop = window.setInterval(function () {
            self.update();
        }, (1000 / 24) | 0);
    };

    update = (): void => {
        if (this.listener){
        this.listener.update();}
       // document.getElementById("count").innerText = `${this.count}`;
    };

    defocus = (): void => {
        window.clearInterval(this.loop);
    };


}