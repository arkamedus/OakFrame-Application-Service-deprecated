import {Module} from "../../../lib/model/module/Module";
import {StringTemplate} from "../../../lib/model/template/StringTemplate";
import {AccountHandler} from "../../../lib/model/AccountHandler";
import GraphView from '../view/Graph.html';
import HeaderView from "../view/Header.html";
import {generateStateTemplate} from "../app";
import {ApplicationRouter} from "../../../lib/model/ApplicationRouter";
import {Graph} from "../../../lib/model/Graph";
import {ButtonNode} from "../../../lib/model/node/ButtonNode";
import {LogNode} from "../../../lib/model/node/LogNode";
import {TextNode} from "../../../lib/model/node/TextNode";

export class GraphController extends Module {

    private graph:Graph;

    constructor() {
        super();
        this.graph = new Graph();


        let btn = new ButtonNode(this.graph);
        let txt = new TextNode(this.graph);
        let log = new LogNode(this.graph);

        btn.attachOutput(txt);
        txt.attachOutput(log);

        this.graph.attachNode(btn);
        this.graph.attachNode(txt);
        this.graph.attachNode(log);
    }


    use = (app?:ApplicationRouter) => {
        app.focusModule(this);

        return new Promise(function (resolve, reject) {
            document.body.innerHTML = (new StringTemplate(HeaderView)).apply(generateStateTemplate()) +
                (new StringTemplate(GraphView)).apply(generateStateTemplate());
            resolve();
        });

    };

    focus = (app?:ApplicationRouter) => {

        console.log('FOCUSING ON GRAPH CONTROLLER');

        let graph_area = document.getElementById('graph-render-area');
        this.graph.render(graph_area);

    };

}