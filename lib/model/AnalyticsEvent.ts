import {Serializable} from "./Serializable";

export class AnalyticsEvent implements Serializable {
    public url: string;
    public method: string;
    public pragma: string;
    public cache_control: string;
    public do_not_track: boolean;
    public upgrade_insecure_requests: boolean;
    public user_agent: string;
    public accept: string;
    public accept_encoding: string | string[];
    public accept_language: string | string[];
    public remote_address: string;
    private readonly timestamp: number;

    constructor() {
        this.timestamp = Date.now();
    }

    deserialize() {
        //TODO
    }

    serialize() {
        return {
            url: this.url,
            method: this.method,
            pragma: this.pragma,
            cache_control: this.cache_control,
            do_not_track: this.do_not_track,
            upgrade_insecure_requests: this.upgrade_insecure_requests,
            user_agent: this.user_agent,
            accept: this.accept,
            accept_encoding: this.accept_encoding,
            accept_language: this.accept_language,
            remote_address: this.remote_address,
            timestamp: this.timestamp
        }
    }
}