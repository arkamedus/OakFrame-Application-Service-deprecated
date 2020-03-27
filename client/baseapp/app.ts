import {EntryController} from "./controller/Entry/EntryController";
import {ApplicationRouter} from "../../lib/model/ApplicationRouter";
import {Module} from "../../lib/model/module/Module";
import {AboutController} from "./controller/Entry/AboutController";

const app = <ApplicationRouter>new ApplicationRouter();
let entry = <Module>new EntryController();
let about = <Module>new AboutController();

app.use("/", entry.use);
app.use("/about", about.use);

app.route();