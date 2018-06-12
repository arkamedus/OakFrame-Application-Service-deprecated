///<reference path="../shared/app/model/endpoint/Endpoint.ts"/>

import {ServerProvider} from "../shared/app/model/provider/server/ServerProvider";
import {Endpoint} from "../shared/app/model/endpoint/Endpoint";

let server = new Endpoint(new ServerProvider('localhost'));

