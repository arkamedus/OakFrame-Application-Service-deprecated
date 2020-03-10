import {Module} from "../../../lib/model/module/Module";
import {AccountHandler} from "../../../lib/model/AccountHandler";

export class Account implements AccountHandler{
    isAuthenticated(): boolean {
        return false;
    }
}