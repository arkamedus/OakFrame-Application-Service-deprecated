export function replaceAll(str:any, search:any, replace:any) {
    if (!replace) {
        return str;
    }
    return str.replace(new RegExp('' + search + '', 'g'), replace);
}
