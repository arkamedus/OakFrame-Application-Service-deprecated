import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import {generateStateTemplate} from "../app";
import {ApplicationRouter} from "../../../lib/model/ApplicationRouter";
import HeaderView from "../view/Header.html";
import PlayView from "../view/Play.html";
import PlayFooterView from "../view/PlayFooter.html";
import {Vec3} from "oakframe-interactive/lib/Vec3";
// @ts-ignore
import { mat4, mat3, vec3, glMatrix } from "gl-matrix";
import {AssetLoader} from "../../../../oakframe-interactive/lib/AssetLoader";
import {Route} from "../../../lib/model/Route";
import {ApplicationServer} from "../../../lib/model/ApplicationServer";
import {Surface} from "../../../../oakframe-interactive/lib/Surface";
import {SurfaceGL} from "../../../../oakframe-interactive/lib/SurfaceGL";

export class PlayController extends Module {

    surface: SurfaceGL;
    vec: Vec3;
    loop: any;

    use = (app?:ApplicationRouter) => {

            app.focusModule(this);
        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(HeaderView)).apply(generateStateTemplate()) +
                (new StringTemplate(`<div class="hero flex"><div class="container med"><h1>LOADING</h1></div></div>`)).apply(generateStateTemplate());
            resolve();
        });

    };

    focus = (): void => {
        let assetManager = new AssetLoader();
        let self = this;

        let texture = assetManager.loadSprite("/img/grass.png");

        assetManager.subscribe('loaded',() => {
            document.body.innerHTML = (new StringTemplate(HeaderView)).apply(generateStateTemplate()) +
                (new StringTemplate(PlayView)).apply(generateStateTemplate())+
                (new StringTemplate(PlayFooterView)).apply(generateStateTemplate());
            self.surface = new SurfaceGL(<HTMLCanvasElement>document.getElementById('canvas-play')/*, texture*/);
            self.surface.maximize();
            self.loop = requestAnimationFrame(self.update);
        });
         //this.surface.fill("red");

    };

    update = (): void => {
        this.loop = requestAnimationFrame(this.update);

        this.surface.maximize();
       this.surface.render();
    };

    defocus = (): void => {
        //window.clearInterval(this.loop);
        cancelAnimationFrame(this.loop);
    };

}