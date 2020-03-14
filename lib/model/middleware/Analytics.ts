/*
 * Middleware wrapper for analytics
 */
import {ApplicationServer} from "../ApplicationServer";
import {Route} from "../Route";
import {MiddlewareInterface} from "../../interface/Middleware";
import {AnalyticsEvent} from "../AnalyticsEvent";

export class Analytics implements MiddlewareInterface {

    setup(app: ApplicationServer) {

        app.use('/(.+)?', function (route: Route) {
            return new Promise(function (resolve, reject) {
                let event = new AnalyticsEvent();
                event.url = route.getRequest().url;
                event.method = route.getRequest().method || "unknown";
                event.pragma = route.getRequest().headers.pragma || "no-cache";
                event.cache_control = route.getRequest().headers["cache-control"] || "no-cache";
                event.do_not_track = !!parseInt((route.getRequest().headers["dnt"] || "0").toString());
                event.upgrade_insecure_requests = !!parseInt((route.getRequest().headers["upgrade-insecure-requests"] || "0").toString());
                event.user_agent = route.getRequest().headers["user-agent"] || "";
                event.accept = route.getRequest().headers["accept"] || "";
                event.accept_encoding = route.getRequest().headers["accept-encoding"] || "";
                event.accept_language = route.getRequest().headers["accept-language"] || "";
                event.remote_address = route.getRequest().connection.remoteAddress || "unknown";
                resolve();
            });
        });

        app.use('/analytics/log/', function (route: Route) {
            return new Promise(function (resolve, reject) {

                let response = route.getResponse();
                let request = route.getRequest();
                route.getResponse().writeHead(200, {'Content-Type': `text/html`});
                response.end(`
    <h1>/log</h1>
    <p>${JSON.stringify(request.headers)}</p>
    <p>${JSON.stringify(request.headers.host)}</p>
    <p>${JSON.stringify(request.headers["upgrade-insecure-requests"])}</p>
    <p>${JSON.stringify(request.connection.remoteAddress)}</p>
    <p>${JSON.stringify(request.socket.remoteAddress)}</p>
    `);
                route.end();
                resolve();
            });
        });

    }

    /*
        submitEvent(eventName: string, route: RouteInterface) {

            let self = this;

            let sess = '';
            if (route.getRequest().cookies) {
                sess = route.getRequest().cookies['express:sess'] || '';
            }
            let event = self.app.DB().getCollections()["Event"].factoryFromFlatObjectAsFields({
                forwarded: route.getRequest().headers['x-forwarded-for'],
                tag: eventName,
                url: route.getRequest().url,
                session: crypto.createHash('sha1').update(sess).digest('hex')
            });

            self.app.DB().save('kino', event.type, event, function (e2, r2) {
            });
        }*/

}