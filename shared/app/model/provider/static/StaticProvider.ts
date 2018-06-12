///<reference path="../../../interface/Provider.ts"/>

export class StaticProvider implements Provider {
    close(callback: any): any {
        return undefined;
    }

    get(instance: any): any {
        return instance;
    }

    then(): any {
        return undefined;
    }

    error(): any {
        return undefined;
    }

    end(): any {
        return undefined;
    }

}