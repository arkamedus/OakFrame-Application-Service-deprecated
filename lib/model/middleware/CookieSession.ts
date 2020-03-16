/*
 * Middleware wrapper for cookie-session
 */
import {MiddlewareInterface} from "../../interface/Middleware";
import {ApplicationServer} from "../ApplicationServer";
import {RouteInterface} from "../../interface/RouteInterface";

export class CookieSession implements MiddlewareInterface {

    setup(app: ApplicationServer) {
        let self = this;
        let cookieSession = require('cookie-session');

        app.use('/(.+)?', function (route: RouteInterface) {
            return new Promise(function (resolve, reject) {
                cookieSession({keys: ['newsecret', 'newsecret']})(route.getRequest(), route.getResponse(), resolve);
                route.getRequest().cookies = self.parseCookies(route.getRequest().headers.cookie);
            });
        });
    }

    parseCookies(input) {
        let parts = input.split(';');
        let ob = {};

        parts.forEach(function (part, i) {
            parts[i] = part.trim();
            let e = parts[i].split('=');
            ob[e[0]] = e[1];
        });
        return ob;
    }

}