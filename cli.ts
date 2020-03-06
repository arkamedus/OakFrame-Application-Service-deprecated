#!/usr/bin/env ts-node

const args = (process.argv.slice(2));
let cmd = args[0] || 'help';

if (cmd === "-v") {
    cmd = 'version';
}

if (cmd === "-h") {
    cmd = 'help';
}

switch (cmd) {
    case 'version':
        console.log(version(args));
        break;

    case 'help':
        console.log(help(args));
        break;

    default:
        console.error(`OakFrame: "${cmd}" is not a valid option.`);
        console.log(help(args));
        break;
}

function version(args?) {
    return "OakFrame Application Service CLI v0.0.1";
}

function help(args?) {
    return "Usage: oakframe [options]\n\nOptions:\nhelp, -h\t\t\tdisplay help information\nversion, -v\t\t\tdisplay oakframe version";
}