import {RouteInterface} from "../interface/RouteInterface";
import {IncomingMessage, ServerResponse} from "http";

export interface IncomingMessageQueryParam extends IncomingMessage {
    query: Array<string>;
    params: Array<string>;
    cookies: any;
}

export class Route implements RouteInterface {

    body: Array<string>;
    head: Array<string>;
    script: Array<string>;
    style: Array<string>;
    request: IncomingMessageQueryParam;
    response: ServerResponse;
    dropout: boolean;

    constructor() {
        this.body = [];
        this.head = [];
        this.script = [];
        this.style = [];
        this.dropout = false;
    }

    enqueueScript(script: string) {
        this.script.push(script);
    }

    enqueueStyle(style: string) {
        this.style.push(style);
    }

    enqueueHead(head: string) {
        this.head.push(head);
    }

    enqueueBody(body: string) {
        this.body.push(body);
    }

    getPayload() {
        let self = this;

        return new Promise(function (resolve, reject) {

            let style = self.style.join(' ');

            let script = self.script.join(' ');

            resolve(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" user-scalable="no"/>
${self.head.join(' ')}
<style>
${style}
</style>
</head>
<body>
${self.body.join(' ')}
<script type="text/javascript">${script}</script>
</body>
</html>`);

        });

    }

    getRequest(): IncomingMessageQueryParam {
        return this.request;
    }

    getResponse(): ServerResponse {
        return this.response;
    }

    setRequest(request: IncomingMessageQueryParam): void {
        this.request = request;
    }

    setResponse(response: ServerResponse) {
        this.response = response;
    }

    end() {
        this.dropout = true;
    }

}