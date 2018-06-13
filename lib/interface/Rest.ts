//** @interface Rest expects an HTTP like request and response
interface Rest {
    route(request, response): any;
}