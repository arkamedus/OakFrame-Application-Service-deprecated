///<reference path="../lib/model/endpoint/Endpoint.ts"/>

import {ServerProvider} from "../lib/model/provider/server/ServerProvider";
import {Endpoint} from "../lib/model/endpoint/Endpoint";

let server = new ServerProvider(new Endpoint());

