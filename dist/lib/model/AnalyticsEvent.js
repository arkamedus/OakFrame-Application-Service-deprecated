"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnalyticsEvent = /** @class */ (function () {
    function AnalyticsEvent() {
        this.timestamp = Date.now();
    }
    AnalyticsEvent.prototype.deserialize = function () {
        //TODO
    };
    AnalyticsEvent.prototype.serialize = function () {
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
        };
    };
    return AnalyticsEvent;
}());
exports.AnalyticsEvent = AnalyticsEvent;
