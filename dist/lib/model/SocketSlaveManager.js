"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketSlaveManager = /** @class */ (function () {
    function SocketSlaveManager() {
        this.slaves = [];
    }
    SocketSlaveManager.prototype.addSlave = function (id, connection) {
        this.slaves.push(new SocketSlaveClient(this, id, connection));
    };
    SocketSlaveManager.prototype.getSlaveById = function (id) {
        var slave;
        this.slaves.forEach(function (sl) {
            if (sl.getId() === id) {
                slave = sl;
            }
        });
        return slave;
    };
    SocketSlaveManager.prototype.getSlaves = function () {
        return this.slaves;
    };
    SocketSlaveManager.prototype.getSerialized = function () {
        var slaves = this.getSlaves();
        var arr = [];
        slaves.forEach(function (slave) {
            arr.push(slave.serialize());
        });
        return arr;
    };
    SocketSlaveManager.prototype.removeSlave = function (id) {
        var idx = -1;
        this.slaves.forEach(function (slave, i) {
            if (slave.getId() === id) {
                idx = i;
            }
        });
        if (idx >= 0) {
            this.slaves[idx].getConnection().close();
            this.slaves.splice(idx, 1);
        }
    };
    return SocketSlaveManager;
}());
exports.SocketSlaveManager = SocketSlaveManager;
var SocketSlaveClient = /** @class */ (function () {
    function SocketSlaveClient(manager, id, connection) {
        this.id = id;
        this.connection = connection;
        this.last_pong_received = Date.now();
        this.manager = manager;
        this.latency = [-1];
    }
    SocketSlaveClient.prototype.getId = function () {
        return this.id;
    };
    SocketSlaveClient.prototype.getConnection = function () {
        return this.connection;
    };
    SocketSlaveClient.prototype.serialize = function () {
        return {
            id: this.id,
            cpuManufacturer: this.cpuManufacturer,
            cpuBrand: this.cpuBrand,
            cpuCores: this.cpuCores,
            cpuSpeed: this.cpuSpeed,
            cpuTemperature: this.cpuTemperature,
            cpuLoad: (this.cpuLoad || 0).toFixed(2),
            fsSize: this.fsSize,
            fsUsed: this.fsUsed,
            memTotal: ((this.memTotal || 0) / 1024 / 1024 / 1024).toFixed(2),
            memUsed: (this.memUsed || 0).toFixed(2),
            netLatency: (this.latency[this.latency.length - 1] || -1)
        };
    };
    SocketSlaveClient.prototype.ping = function () {
        var self = this;
        this.last_ping_sent = Date.now();
        this.connection.sendUTF(JSON.stringify({ ping: true }));
        setTimeout(function () {
            if (Date.now() - self.last_pong_received > 1000 * 15) {
                self.connection.close();
                self.manager.removeSlave(self.id);
            }
        });
    };
    SocketSlaveClient.prototype.recordPong = function () {
        this.latency.push(Date.now() - this.last_ping_sent);
        if (this.latency.length > 9) {
            this.latency.shift();
        }
        this.last_pong_received = Date.now();
    };
    return SocketSlaveClient;
}());
exports.SocketSlaveClient = SocketSlaveClient;
