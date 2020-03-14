/*
 * Middleware wrapper for body-parser
 */
import {MiddlewareInterface} from "../../interface/Middleware";
import {ApplicationServer} from "../ApplicationServer";
import {RouteInterface} from "../../interface/RouteInterface";

const bodyParser = require('body-parser');

export class URLEncoded implements MiddlewareInterface {

    setup(app: ApplicationServer) {

        app.use('/(.+)?', function (route: RouteInterface) {
            return new Promise(function (resolve, reject) {
                bodyParser.urlencoded({ limit: '150mb',extended: true })(route.getRequest(),route.getResponse(),resolve);
            });
        });

        app.use('/(.+)?', function (route: RouteInterface) {
            return new Promise(function (resolve, reject) {
                bodyParser.json({limit: '150mb'})(route.getRequest(),route.getResponse(),resolve);
            });
        });

    }

}