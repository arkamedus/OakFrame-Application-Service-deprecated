"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var Utils_1 = require("./Utils");
var Template = /** @class */ (function () {
    function Template(file) {
        this.file_accessed = Date.now();
        this.file = file;
        this.loadFile(file);
    }
    Template.prototype.getContents = function () {
        return this.contents;
    };
    Template.prototype.apply = function (template_key_value) {
        this.loadFile(this.file);
        var s = ''.concat(this.contents);
        for (var data in template_key_value) {
            s = Utils_1.replaceAll(s, '{' + (data) + '}', template_key_value[data]);
        }
        return s;
    };
    Template.prototype.loadFile = function (f) {
        if (fs_1.existsSync(f)) {
            this.contents = fs_1.readFileSync(f, 'binary');
        }
        else {
            console.error('file not loaded', f);
        }
    };
    return Template;
}());
exports.Template = Template;
