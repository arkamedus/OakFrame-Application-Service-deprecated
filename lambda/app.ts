///<reference path="../shared/app/model/endpoint/Endpoint.ts"/>

import {StaticProvider} from "../shared/app/model/provider/static/StaticProvider";
import {Endpoint} from "../shared/app/model/endpoint/Endpoint";

let server = new Endpoint(new StaticProvider());