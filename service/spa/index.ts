import {Core} from "../../lib/model/Core";
import {existsSync, readFileSync} from "fs";
import {CookieSession} from "../../lib/model/middleware/CookieSession";
import {Template} from "../../lib/model/Template";
import {Analytics} from "../../lib/model/middleware/Analytics";
import {Route} from "../../lib/model/Route";

let app = new Core();

app.register(new CookieSession());
app.register(new Analytics());

let _mimeTypes = {
    'ico': 'image/x-icon',
    'html': 'text/html',
    'js': 'text/javascript',
    'json': 'application/json',
    'css': 'text/css',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'wav': 'audio/wav',
    'mp3': 'audio/mpeg',
    'avi': 'video/avi',
    'mp4': 'video/mp4',
    'mov': 'video/mov',
    'webm': 'audio/webm',
    'svg': 'image/svg+xml',
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'eot': 'appliaction/vnd.ms-fontobject',
    'ttf': 'x-font/ttf',
    'gif': 'image/gif',
    'manifest': 'text/cache-manifest'
};

app.use('/([a-zA-Z0-9-/_)]+).(html|css|png|jpg|js|json|svg|mp3|wav|oft|ttf|gif|ico|manifest)', function (route: Route) {

    return new Promise(function (resolve, reject) {
        let filename = `../../client/spa/dist/${route.getRequest().params[0]}.${route.getRequest().params[1]}`;

        if (existsSync(filename)) {
            route.getResponse().writeHead(200, {'Content-Type': _mimeTypes[route.getRequest().params[1]]});
            route.getResponse().end(
                (new Template(filename)).apply({hostname: app.getHostname(), port: app.getPort()}), 'binary'
            );
            route.end();
            resolve();
        } else {
            console.error(filename);
            reject("File does not exist");
        }
    });

});

app.use('/([^.]+)?/?', function (route: Route) {

    return new Promise(function (resolve) {
        let filename = `../../client/spa/dist/index.html`;

        if (existsSync(filename)) {
            route.getResponse().writeHead(200, {'Content-Type': `text/html`});
            route.getResponse().end(
                (new Template(filename)).apply({hostname: app.getHostname(), port: app.getPort()}), 'binary'
            );
        } else {
            console.error(`Unable to find ${filename}`);
        }
        resolve();
    });

});

app.listen(8084);