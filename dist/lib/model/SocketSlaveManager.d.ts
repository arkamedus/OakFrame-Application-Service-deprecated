export declare class SocketSlaveManager {
    private slaves;
    constructor();
    addSlave(id: any, connection: any): void;
    getSlaveById(id: string): any;
    getSlaves(): SocketSlaveClient[];
    getSerialized(): any[];
    removeSlave(id: any): void;
}
export declare class SocketSlaveClient {
    private connection;
    private id;
    private last_ping_sent;
    private last_pong_received;
    private latency;
    private manager;
    cpuManufacturer: any;
    cpuBrand: any;
    cpuCores: any;
    cpuSpeed: any;
    cpuTemperature: any;
    cpuLoad: any;
    fsSize: any;
    fsUsed: any;
    memTotal: any;
    memUsed: any;
    constructor(manager: any, id: any, connection: any);
    getId(): string;
    getConnection(): any;
    serialize(): {
        id: string;
        cpuManufacturer: any;
        cpuBrand: any;
        cpuCores: any;
        cpuSpeed: any;
        cpuTemperature: any;
        cpuLoad: any;
        fsSize: any;
        fsUsed: any;
        memTotal: string;
        memUsed: any;
        netLatency: number;
    };
    ping(): void;
    recordPong(): void;
}
