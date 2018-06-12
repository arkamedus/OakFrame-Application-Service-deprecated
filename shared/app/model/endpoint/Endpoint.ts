export class Endpoint {
    private _url: string;
    private _routes: any[] = [];

    constructor() {
        this._url = 'localhost';
    }

    route(request, response) {
        if (!this._routes[request.url]) {
            response.end(JSON.stringify({
                err: true,
                url: request.url,
                message: `No routes defined for Endpoint`,
                headers: request.headers
            }));
            return;
        }
        return (this._routes[request.url](response))
    }

    define(slug: string, callback: any) {
        // if (this._routes[slug]){
        //   callback();
        // }
        this._routes[slug] = callback;
    }


}