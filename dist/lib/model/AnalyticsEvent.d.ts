import { Serializable } from "./Serializable";
export declare class AnalyticsEvent implements Serializable {
    url: string;
    method: string;
    pragma: string;
    cache_control: string;
    do_not_track: boolean;
    upgrade_insecure_requests: boolean;
    user_agent: string;
    accept: string;
    accept_encoding: string | string[];
    accept_language: string | string[];
    remote_address: string;
    private readonly timestamp;
    constructor();
    deserialize(): void;
    serialize(): {
        url: string;
        method: string;
        pragma: string;
        cache_control: string;
        do_not_track: boolean;
        upgrade_insecure_requests: boolean;
        user_agent: string;
        accept: string;
        accept_encoding: string | string[];
        accept_language: string | string[];
        remote_address: string;
        timestamp: number;
    };
}
